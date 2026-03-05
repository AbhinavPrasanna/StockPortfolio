import React, { useEffect, useState } from 'react'
import Card from './Card'
import RowScreen from './RowScreen';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:8080/graphql';
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

    async function loadCardsByAnnualFee() {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: CARDS_BY_ANNUAL_FEE_QUERY,
            variables: {
              size: 300,
            },
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`GraphQL request failed with status ${response.status}`);
        }

        const result = await response.json();
        if (result.errors?.length) {
          throw new Error(result.errors[0].message || 'GraphQL error while loading fee-based cards');
        }

        setNoAnnualFeeCards((result.data?.noAnnualFee?.content || []).map(mapGraphqlCardToCard));
        setAnnualFeeCards((result.data?.annualFee?.content || []).map(mapGraphqlCardToCard));
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErrorMessage('Unable to load fee-based card data right now.');
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