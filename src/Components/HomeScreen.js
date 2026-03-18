import React, { useEffect, useState } from 'react'
import Card from './Card'
import RowScreen from './RowScreen'
import PreviewScreen from './PreviewScreen';
import BankScreen from './BankScreen';
import CardsScreen from './CardsScreen';
import { fetchGraphqlCached, getCachedGraphqlData } from '../Utils/graphqlClient';

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

function hasRealImage(card) {
  return !card.cardThumbnailURL.includes('dummyimage.com');
}

function prioritizeCardsWithRealImages(cards) {
  return [...cards].sort((a, b) => Number(hasRealImage(b)) - Number(hasRealImage(a)));
}

function HomeScreen() {
  const [personalcards, setPersonalCards] = useState([]);
  const [businesscards, setBusinessCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const queryVariables = { size: 300 };

    function applyCardsData(data) {
      const allCards = (data?.cards?.content || []).map(mapGraphqlCardToCard);
      const dedupedCards = Array.from(new Map(allCards.map((card) => [card.cardID, card])).values());
      const business = prioritizeCardsWithRealImages(
        dedupedCards.filter((card) => isBusinessCardType(card.type))
      );
      const personal = prioritizeCardsWithRealImages(
        dedupedCards.filter((card) => !isBusinessCardType(card.type))
      );

      setPersonalCards(personal);
      setBusinessCards(business);
    }

    async function loadHomeCards() {
      try {
        setErrorMessage('');

        const cachedData = getCachedGraphqlData(HOME_SCREEN_CARDS_QUERY, queryVariables);
        setLoading(!cachedData);
        if (cachedData) {
          applyCardsData(cachedData);
        }

        const data = await fetchGraphqlCached({
          query: HOME_SCREEN_CARDS_QUERY,
          variables: queryVariables,
          signal: controller.signal,
        });

        applyCardsData(data);
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