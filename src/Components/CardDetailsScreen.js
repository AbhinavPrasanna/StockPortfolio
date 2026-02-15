import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

function CardDetailsScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const card = location.state?.card;

  if (!card) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h3 fw-bold mb-3">Card Details</h1>
        <p className="text-muted mb-4">No card was selected. Please choose a card from any row.</p>
        <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="text-center">
        <img
          src={card.cardThumbnailURL}
          alt={card.cardName}
          className="img-fluid mb-4"
          style={{ maxWidth: '420px' }}
        />
        <h1 className="h2 fw-bold mb-3">{card.cardName}</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
          This is a sample card description. You can replace this section with real card details,
          benefits, annual fee information, and reward highlights.
        </p>
      </div>
    </Container>
  );
}

export default CardDetailsScreen;
