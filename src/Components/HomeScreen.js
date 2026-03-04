import React, { useEffect, useState } from 'react'
import Card from './Card'
import RowScreen from './RowScreen'
import PreviewScreen from './PreviewScreen';
import BankScreen from './BankScreen';
import CardsScreen from './CardsScreen';

const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:8080/graphql';
const S3_IMAGE_BASE_URL = process.env.REACT_APP_S3_IMAGE_BASE_URL || 'https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/';

const HOME_SCREEN_CARDS_QUERY = `
  query HomeScreenCards($size: Int!) {
    cards(page: 0, size: $size) {
      content {
        id
        cardName
        cardType
        cardBank
        hasAnnualFee
        rating
        imageSourceUrl
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

function isBusinessCardType(type) {
  const normalizedType = (type || '').toLowerCase();
  return normalizedType.includes('business') || normalizedType === 'buisness';
}

function HomeScreen() {
  const [personalcards, setPersonalCards] = useState([]);
  const [businesscards, setBusinessCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadHomeCards() {
      try {
        setLoading(true);
        setErrorMessage('');

        const response = await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: HOME_SCREEN_CARDS_QUERY,
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
          throw new Error(result.errors[0].message || 'GraphQL error while loading cards');
        }

        const allCards = (result.data?.cards?.content || []).map(mapGraphqlCardToCard);
        const dedupedCards = Array.from(new Map(allCards.map((card) => [card.cardID, card])).values());
        const business = dedupedCards.filter((card) => isBusinessCardType(card.type));
        const personal = dedupedCards.filter((card) => !isBusinessCardType(card.type));

        setPersonalCards(personal);
        setBusinessCards(business);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setErrorMessage('Unable to load card data right now.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadHomeCards();
    return () => controller.abort();
  }, []);

  return (
    <div>
      <PreviewScreen/>
      {loading && <p>Loading cards...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <div className="mt-5">
        <RowScreen title="Personal" cards={personalcards}/>
      </div>
      <div className="mt-5">
        <RowScreen title="Business" cards={businesscards}/>
      </div>
      <CardsScreen/>
      <BankScreen/>
      
    </div>
  )
}

export default HomeScreen