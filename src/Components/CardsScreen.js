import React, { useEffect, useState } from 'react'
import Card from './Card'
import RowScreen from './RowScreen';
import { fetchGraphqlCached, getCachedGraphqlData } from '../Utils/graphqlClient';

const S3_IMAGE_BASE_URL = process.env.REACT_APP_S3_IMAGE_BASE_URL || 'https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/';

const CARDS_BY_ANNUAL_FEE_QUERY = `
  query CardsByAnnualFee($size: Int!) {
    noAnnualFee: cards(page: 0, size: $size, hasAnnualFee: false) {
      content {
        id
        cardName
        cardType
        cardBank
        hasAnnualFee
        rating
        imageSourceUrl
        imageS3Key
        relatedCardsByBank(limit: 3) {
          id
          cardName
          cardType
          cardBank
          hasAnnualFee
          rating
          imageSourceUrl
          imageS3Key
        }
      }
    }
    annualFee: cards(page: 0, size: $size, hasAnnualFee: true) {
      content {
        id
        cardName
        cardType
        cardBank
        hasAnnualFee
        rating
        imageSourceUrl
        imageS3Key
        relatedCardsByBank(limit: 3) {
          id
          cardName
          cardType
          cardBank
          hasAnnualFee
          rating
          imageSourceUrl
          imageS3Key
        }
      }
    }
  }
`;

const CARDS_BY_ANNUAL_FEE_QUERY_FALLBACK = `
  query CardsByAnnualFeeFallback($size: Int!) {
    noAnnualFee: cards(page: 0, size: $size, hasAnnualFee: false) {
      content {
        id
        cardName
        cardType
        cardBank
        hasAnnualFee
        rating
        imageSourceUrl
        imageS3Key
      }
    }
    annualFee: cards(page: 0, size: $size, hasAnnualFee: true) {
      content {
        id
        cardName
        cardType
        cardBank
        hasAnnualFee
        rating
        imageSourceUrl
        imageS3Key
      }
    }
  }
`;

function resolveImageUrl(graphqlCard) {
  if (graphqlCard.imageSourceUrl) {
    return graphqlCard.imageSourceUrl;
  }

  if (graphqlCard.imageS3Key) {
    if (graphqlCard.imageS3Key.startsWith('http://') || graphqlCard.imageS3Key.startsWith('https://')) {
      return graphqlCard.imageS3Key;
    }
    return `${S3_IMAGE_BASE_URL}${graphqlCard.imageS3Key}`;
  }

  return `https://dummyimage.com/220x140/1f2937/ffffff&text=${encodeURIComponent(graphqlCard.cardName)}`;
}

function mapGraphqlCardToCard(graphqlCard) {
  return new Card(
    Number(graphqlCard.id),
    resolveImageUrl(graphqlCard),
    graphqlCard.cardName,
    graphqlCard.cardType,
    graphqlCard.cardBank,
    graphqlCard.hasAnnualFee,
    graphqlCard.rating
  );
}

function CardsScreen() {
  const [annualFeeCards, setAnnualFeeCards] = useState([]);
  const [noAnnualFeeCards, setNoAnnualFeeCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const queryVariables = { size: 300 };

    function applyCardsByFeeData(data) {
      setNoAnnualFeeCards((data?.noAnnualFee?.content || []).map(mapGraphqlCardToCard));
      setAnnualFeeCards((data?.annualFee?.content || []).map(mapGraphqlCardToCard));
    }

    async function loadCardsByAnnualFee() {
      try {
        setErrorMessage('');

        const cachedData = getCachedGraphqlData(CARDS_BY_ANNUAL_FEE_QUERY, queryVariables);
        setLoading(!cachedData);
        if (cachedData) {
          applyCardsByFeeData(cachedData);
        }

        const data = await fetchGraphqlCached({
          query: CARDS_BY_ANNUAL_FEE_QUERY,
          variables: queryVariables,
          signal: controller.signal,
        });

        applyCardsByFeeData(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        try {
          const fallbackData = await fetchGraphqlCached({
            query: CARDS_BY_ANNUAL_FEE_QUERY_FALLBACK,
            variables: queryVariables,
            signal: controller.signal,
          });
          applyCardsByFeeData(fallbackData);
          setErrorMessage('');
        } catch (fallbackError) {
          if (fallbackError.name !== 'AbortError') {
            const detail = fallbackError?.message ? ` (${fallbackError.message})` : '';
            setErrorMessage(`Unable to load fee-based card data right now${detail}.`);
          }
        }
      } finally {
        setLoading(false);
      }
    }

    loadCardsByAnnualFee();
    return () => controller.abort();
  }, []);

  return (
    <div>
      {loading && <p>Loading cards...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <div className="mt-5">
        <RowScreen title="No Annual Fee" cards={noAnnualFeeCards}/>
      </div>
      <div className="mt-5">
        <RowScreen title="Annual Fee" cards={annualFeeCards}/>
      </div>
    </div>
  )
}

export default CardsScreen