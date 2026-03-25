import React, { useEffect, useMemo, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchGraphqlCached } from '../Utils/graphqlClient';
import '../Stylesheets/CardDetailsScreen.css';

const CARD_DETAILS_QUERY = `
  query CardDetailsByName($name: String!) {
    cardByName(name: $name) {
      id
      cardName
      cardType
      cardBank
      hasAnnualFee
      annualFee
      creditScore
      cashbackFlat
      cashbackTravel
      cashbackDining
      cashbackGrocery
      cashbackGas
      cashbackPharmacy
      cashbackLyft
      cashbackOfficeSupply
      cashbackServices
      cashbackBrand
      cashbackOther
      imageSourceUrl
      imageS3Key
    }
  }
`;

const S3_IMAGE_BASE_URL =
  process.env.REACT_APP_S3_IMAGE_BASE_URL ||
  'https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/';

function isNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function formatPercent(value) {
  return `${Number(value).toFixed(Number(value) % 1 === 0 ? 0 : 1)}%`;
}

function getCashbackCategoryBubbles(card) {
  const variants = ['primary', 'success', 'info', 'warning', 'danger', 'secondary', 'dark'];
  const categories = [
    ['Flat', card?.cashbackFlat],
    ['Travel', card?.cashbackTravel],
    ['Dining', card?.cashbackDining],
    ['Grocery', card?.cashbackGrocery],
    ['Gas', card?.cashbackGas],
    ['Pharmacy', card?.cashbackPharmacy],
    ['Lyft', card?.cashbackLyft],
    ['Office Supply', card?.cashbackOfficeSupply],
    ['Services', card?.cashbackServices],
    ['Brand', card?.cashbackBrand],
    ['Other', card?.cashbackOther],
  ];

  return categories.map(([label, rate], index) => ({
    label,
    value: isNumber(rate) ? formatPercent(rate) : 'N/A',
    variant: variants[index % variants.length],
  }));
}

function resolveImageUrl(card) {
  if (card?.imageSourceUrl) {
    return card.imageSourceUrl;
  }
  if (card?.imageS3Key) {
    if (card.imageS3Key.startsWith('http://') || card.imageS3Key.startsWith('https://')) {
      return card.imageS3Key;
    }
    return `${S3_IMAGE_BASE_URL}${card.imageS3Key}`;
  }
  return card?.cardThumbnailURL;
}

function buildCardDescription(card) {
  const cardBank = card?.cardBank || card?.bank || 'Unknown bank';
  const cardType = card?.cardType || card?.type || 'Unknown';
  const annualFeeValue = card?.annualFee;
  const hasAnnualFee =
    typeof card?.hasAnnualFee === 'boolean' ? card.hasAnnualFee : Boolean(card?.annualfee);
  const annualFeeText = hasAnnualFee
    ? `annual fee ${isNumber(annualFeeValue) ? `$${annualFeeValue}` : 'applies'}`
    : 'no annual fee';
  const creditScoreText = isNumber(card?.creditScore)
    ? `${Math.round(card.creditScore)}+`
    : 'not specified';

  return `This is a ${cardBank} ${cardType} card with ${annualFeeText}. Recommended credit score: ${creditScoreText}.`;
}

function getAnnualFeeText(card) {
  const annualFeeValue = card?.annualFee;
  const hasAnnualFee =
    typeof card?.hasAnnualFee === 'boolean' ? card.hasAnnualFee : Boolean(card?.annualfee);

  if (!hasAnnualFee) {
    return 'Annual Fee: $0';
  }

  if (isNumber(annualFeeValue)) {
    return `Annual Fee: $${annualFeeValue}`;
  }

  return 'Annual Fee: Applies';
}

function CardDetailsScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const baseCard = location.state?.card;
  const [fetchedCard, setFetchedCard] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCardDetails() {
      if (!baseCard?.cardName) {
        return;
      }

      try {
        const data = await fetchGraphqlCached({
          query: CARD_DETAILS_QUERY,
          variables: { name: baseCard.cardName },
          ttlMs: 2 * 60 * 1000,
        });
        if (isMounted && data?.cardByName) {
          setFetchedCard(data.cardByName);
        }
      } catch (error) {
        // Keep showing available local details if backend lookup fails.
      }
    }

    loadCardDetails();
    return () => {
      isMounted = false;
    };
  }, [baseCard?.cardName]);

  const card = useMemo(() => ({ ...(baseCard || {}), ...(fetchedCard || {}) }), [baseCard, fetchedCard]);

  if (!card) {
    return (
      <Container className="py-5 text-center">
        <h1 className="card-details-title h3 fw-bold mb-3">Card Details</h1>
        <p className="card-details-description mb-4">No card was selected. Please choose a card from any row.</p>
        <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="text-center">
        <img
          src={resolveImageUrl(card)}
          alt={card.cardName}
          className="img-fluid mb-4"
          style={{ maxWidth: '420px' }}
        />
        <h1 className="card-details-title h2 fw-bold mb-3">{card.cardName}</h1>
        <p className="card-details-fee h5 fw-bold mb-3">{getAnnualFeeText(card)}</p>
        <p className="card-details-description lead mx-auto" style={{ maxWidth: '700px' }}>
          {buildCardDescription(card)}
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
          {getCashbackCategoryBubbles(card).map((item) => (
            <span key={item.label} className={`badge rounded-pill bg-${item.variant} px-3 py-2 card-details-bubble`}>
              {item.label}: {item.value}
            </span>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default CardDetailsScreen;
