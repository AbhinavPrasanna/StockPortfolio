const DEFAULT_TTL_MS = 5 * 60 * 1000;

const queryCache = new Map();
let preferredEndpoint = null;

function buildGraphqlEndpointCandidates() {
  const browserHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const envEndpoint = process.env.REACT_APP_GRAPHQL_URL;
  const endpoints = [
    envEndpoint,
    `http://${browserHost}:8080/graphql`,
    'http://localhost:8080/graphql',
    'http://127.0.0.1:8080/graphql',
  ].filter(Boolean);

  return Array.from(new Set(endpoints));
}

function buildCacheKey(query, variables) {
  return `${query}::${JSON.stringify(variables || {})}`;
}

async function fetchGraphqlFromEndpoint({ endpoint, query, variables, signal }) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: variables || {},
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const result = await response.json();
  if (result.errors?.length) {
    throw new Error(result.errors[0].message || 'GraphQL request failed');
  }

  return result.data || {};
}

function isAbortError(error) {
  return error?.name === 'AbortError';
}

async function fetchGraphql({ query, variables, signal }) {
  const endpointCandidates = buildGraphqlEndpointCandidates();
  const orderedCandidates = preferredEndpoint
    ? [preferredEndpoint, ...endpointCandidates.filter((endpoint) => endpoint !== preferredEndpoint)]
    : endpointCandidates;

  let lastError = null;
  for (const endpoint of orderedCandidates) {
    try {
      const data = await fetchGraphqlFromEndpoint({ endpoint, query, variables, signal });
      preferredEndpoint = endpoint;
      return data;
    } catch (error) {
      if (isAbortError(error)) {
        throw error;
      }
      lastError = error;
    }
  }

  throw lastError || new Error('Unable to reach GraphQL endpoint');
}

export function getCachedGraphqlData(query, variables) {
  const key = buildCacheKey(query, variables);
  const cachedEntry = queryCache.get(key);

  if (!cachedEntry) {
    return null;
  }

  if (cachedEntry.expiresAt <= Date.now()) {
    queryCache.delete(key);
    return null;
  }

  return cachedEntry.data || null;
}

export async function fetchGraphqlCached({ query, variables, signal, ttlMs = DEFAULT_TTL_MS }) {
  const key = buildCacheKey(query, variables);
  const cachedEntry = queryCache.get(key);

  if (cachedEntry && cachedEntry.expiresAt > Date.now()) {
    return cachedEntry.data || {};
  }

  try {
    const data = await fetchGraphql({ query, variables, signal });
    const hasPayload = data && typeof data === 'object' && Object.keys(data).length > 0;
    if (hasPayload) {
      queryCache.set(key, {
        data,
        expiresAt: Date.now() + ttlMs,
      });
    } else {
      queryCache.delete(key);
    }
    return data;
  } catch (error) {
    queryCache.delete(key);
    throw error;
  }
}

export function invalidateGraphqlCache() {
  queryCache.clear();
}
