import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Card } from 'react-bootstrap';
import { fetchGraphqlCached } from '../Utils/graphqlClient';
import '../Stylesheets/LineupOptimizer.css';

const S3_IMAGE_BASE_URL =
  process.env.REACT_APP_S3_IMAGE_BASE_URL ||
  'https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/';

const OPTIMIZE_LINEUP_QUERY = `
  query OptimizeCardLineup($input: SpendingProfileInput!) {
    optimizeCardLineup(input: $input) {
      entries {
        card {
          id
          cardName
          cardBank
          cardType
          hasAnnualFee
          annualFee
          rating
          imageSourceUrl
          imageS3Key
          cashbackFlat
          cashbackChoiceHotels
          cashbackHyattHotels
          cashbackHiltonHotels
          cashbackMarriottHotels
        }
        assignedCategories {
          category
          monthlySpend
          effectiveRate
          annualCashback
        }
        annualCashback
        annualFee
        netAnnualValue
      }
      totalAnnualCashback
      totalAnnualFees
      totalNetAnnualValue
      totalMonthlySpend
    }
  }
`;

const HOTEL_CHAINS = [
  { key: 'preferChoiceHotels', label: 'Choice Hotels', icon: '🏨' },
  { key: 'preferHyattHotels', label: 'Hyatt', icon: '🏨' },
  { key: 'preferHiltonHotels', label: 'Hilton', icon: '🏨' },
  { key: 'preferMarriottHotels', label: 'Marriott', icon: '🏨' },
];

const CATEGORY_LABELS = {
  travel: 'Travel',
  dining: 'Dining',
  grocery: 'Grocery',
  gas: 'Gas',
  pharmacy: 'Pharmacy',
  lyft: 'Rideshare',
  officeSupply: 'Office Supply',
  services: 'Services',
  brand: 'Brand',
  other: 'Other',
};

const SPENDING_FIELDS = [
  { key: 'monthlyTravel', label: 'Travel', placeholder: 'Flights, hotels...' },
  { key: 'monthlyDining', label: 'Dining', placeholder: 'Restaurants, bars...' },
  { key: 'monthlyGrocery', label: 'Grocery', placeholder: 'Groceries...' },
  { key: 'monthlyGas', label: 'Gas', placeholder: 'Gas stations...' },
  { key: 'monthlyPharmacy', label: 'Pharmacy', placeholder: 'Pharmacies...' },
  { key: 'monthlyLyft', label: 'Rideshare', placeholder: 'Lyft, Uber...' },
  { key: 'monthlyOfficeSupply', label: 'Office Supply', placeholder: 'Supplies...' },
  { key: 'monthlyServices', label: 'Services', placeholder: 'Streaming, etc.' },
  { key: 'monthlyBrand', label: 'Brand', placeholder: 'Brand purchases...' },
  { key: 'monthlyOther', label: 'Other', placeholder: 'Everything else...' },
];

function resolveImageUrl(card) {
  if (card.imageSourceUrl) return card.imageSourceUrl;
  if (card.imageS3Key) {
    if (card.imageS3Key.startsWith('http://') || card.imageS3Key.startsWith('https://'))
      return card.imageS3Key;
    return `${S3_IMAGE_BASE_URL}${card.imageS3Key}`;
  }
  return `https://dummyimage.com/320x200/1f2937/ffffff&text=${encodeURIComponent(card.cardName)}`;
}

function formatCurrency(value) {
  return `$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getHotelBadges(card) {
  const badges = [];
  if (card.cashbackChoiceHotels) badges.push('Choice Hotels');
  if (card.cashbackHyattHotels) badges.push('Hyatt');
  if (card.cashbackHiltonHotels) badges.push('Hilton');
  if (card.cashbackMarriottHotels) badges.push('Marriott');
  return badges;
}

function LineupOptimizerScreen() {
  const [creditScore, setCreditScore] = useState(750);
  const [spending, setSpending] = useState(
    SPENDING_FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: 0 }), {})
  );
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalMonthly = Object.values(spending).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);

  function handleSpendChange(key, value) {
    const parsed = value === '' ? 0 : parseFloat(value);
    setSpending((prev) => ({ ...prev, [key]: isNaN(parsed) ? 0 : parsed }));
  }

  function handleHotelPrefChange(key) {
    setSelectedHotel((prev) => (prev === key ? null : key));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    const input = { creditScore: parseInt(creditScore, 10) || 750 };
    SPENDING_FIELDS.forEach((f) => {
      input[f.key] = parseFloat(spending[f.key]) || 0;
    });
    HOTEL_CHAINS.forEach((h) => {
      input[h.key] = selectedHotel === h.key;
    });

    try {
      const data = await fetchGraphqlCached({
        query: OPTIMIZE_LINEUP_QUERY,
        variables: { input },
        ttlMs: 0,
      });
      setResult(data.optimizeCardLineup);
    } catch (err) {
      const detail = err?.message ? ` (${err.message})` : '';
      setError(`Failed to optimize lineup${detail}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="optimizer-page">
      <div className="optimizer-header">
        <Container>
          <h1 className="optimizer-title">Card Lineup Optimizer</h1>
          <p className="optimizer-subtitle">
            Find the optimal 5-card lineup that maximizes your annual cashback rewards.
          </p>
        </Container>
      </div>

      <Container>
        <Form onSubmit={handleSubmit}>
          <Card className="optimizer-form-card mb-4">
            <Card.Header>
              <h2 className="optimizer-section-title">Credit Score</h2>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="optimizer-form-label">Your Credit Score</Form.Label>
                    <Form.Control
                      type="number"
                      min={300}
                      max={850}
                      value={creditScore}
                      onChange={(e) => setCreditScore(e.target.value)}
                    />
                    <Form.Text className="text-muted">Range: 300 - 850</Form.Text>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="optimizer-form-card mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="optimizer-section-title">Monthly Spending</h2>
                <span className="optimizer-total-spend">
                  Total: {formatCurrency(totalMonthly)}/mo
                </span>
              </div>
            </Card.Header>
            <Card.Body>
              <Row>
                {SPENDING_FIELDS.map((field) => (
                  <Col md={6} lg={4} key={field.key} className="mb-3">
                    <Form.Group>
                      <Form.Label className="optimizer-form-label">{field.label}</Form.Label>
                      <InputGroup className="optimizer-input-group">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder={field.placeholder}
                          value={spending[field.key] || ''}
                          onChange={(e) => handleSpendChange(field.key, e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          <Card className="optimizer-form-card mb-4">
            <Card.Header>
              <h2 className="optimizer-section-title">Hotel Preferences</h2>
            </Card.Header>
            <Card.Body>
              <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
                Select hotel chains you stay at. Cards with cashback restricted to a specific chain
                will be scored higher if it matches your preference, and lower if it does not.
              </p>
              <div className="d-flex flex-wrap gap-3">
                {HOTEL_CHAINS.map((h) => (
                  <Form.Check
                    key={h.key}
                    type="radio"
                    id={`hotel-${h.key}`}
                    name="hotelPreference"
                    label={h.label}
                    checked={selectedHotel === h.key}
                    onChange={() => handleHotelPrefChange(h.key)}
                    className="optimizer-hotel-checkbox"
                  />
                ))}
                <Form.Check
                  type="radio"
                  id="hotel-none"
                  name="hotelPreference"
                  label="No preference"
                  checked={selectedHotel === null}
                  onChange={() => setSelectedHotel(null)}
                  className="optimizer-hotel-checkbox"
                />
              </div>
            </Card.Body>
          </Card>

          <div className="text-center mb-4">
            <Button
              type="submit"
              className="optimizer-submit-btn"
              disabled={loading || totalMonthly <= 0}
            >
              {loading ? 'Optimizing...' : 'Optimize My Lineup'}
            </Button>
          </div>
        </Form>

        {error && <p className="optimizer-error text-center">{error}</p>}

        {result && result.entries.length === 0 && (
          <p className="optimizer-empty">
            No cards found matching your credit score. Try a different score.
          </p>
        )}

        {result && result.entries.length > 0 && (
          <>
            <h2 className="optimizer-results-title mb-4">Your Optimal Lineup</h2>

            <Card className="optimizer-summary-card mb-4 p-4">
              <Row className="text-center">
                <Col xs={6} md={3}>
                  <div className="optimizer-summary-label">Monthly Spend</div>
                  <div className="optimizer-summary-value">
                    {formatCurrency(result.totalMonthlySpend)}
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="optimizer-summary-label">Annual Cashback</div>
                  <div className="optimizer-summary-value">
                    {formatCurrency(result.totalAnnualCashback)}
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="optimizer-summary-label">Annual Fees</div>
                  <div className="optimizer-summary-value">
                    -{formatCurrency(result.totalAnnualFees)}
                  </div>
                </Col>
                <Col xs={6} md={3}>
                  <div className="optimizer-summary-label">Net Annual Value</div>
                  <div className="optimizer-summary-value">
                    {formatCurrency(result.totalNetAnnualValue)}
                  </div>
                </Col>
              </Row>
            </Card>

            <Row>
              {result.entries.map((entry, index) => (
                <Col md={6} lg={4} key={entry.card.id} className="mb-4">
                  <Card className="optimizer-result-card h-100">
                    <div style={{ position: 'relative' }}>
                      <div className="optimizer-result-rank">{index + 1}</div>
                      <img
                        className="optimizer-card-image"
                        src={resolveImageUrl(entry.card)}
                        alt={entry.card.cardName}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <div className="optimizer-card-name">{entry.card.cardName}</div>
                      <div className="optimizer-card-bank">{entry.card.cardBank}</div>

                      <div className="d-flex flex-wrap gap-1 mb-2">
                        {entry.assignedCategories.map((cat) => (
                          <span key={cat.category} className="optimizer-category-badge">
                            {CATEGORY_LABELS[cat.category] || cat.category}{' '}
                            {cat.effectiveRate}%
                          </span>
                        ))}
                      </div>

                      {getHotelBadges(entry.card).length > 0 && (
                        <div className="d-flex flex-wrap gap-1 mb-2">
                          {getHotelBadges(entry.card).map((chain) => {
                            const isPreferred =
                              (chain === 'Choice Hotels' && selectedHotel === 'preferChoiceHotels') ||
                              (chain === 'Hyatt' && selectedHotel === 'preferHyattHotels') ||
                              (chain === 'Hilton' && selectedHotel === 'preferHiltonHotels') ||
                              (chain === 'Marriott' && selectedHotel === 'preferMarriottHotels');
                            return (
                              <span
                                key={chain}
                                className={`optimizer-hotel-badge${isPreferred ? ' optimizer-hotel-badge--preferred' : ''}`}
                              >
                                🏨 {chain}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      <div className="optimizer-card-values mt-auto">
                        <div className="optimizer-value-block">
                          <div className="optimizer-value-label">Cashback</div>
                          <div className="optimizer-value-amount optimizer-value-positive">
                            +{formatCurrency(entry.annualCashback)}
                          </div>
                        </div>
                        <div className="optimizer-value-block">
                          <div className="optimizer-value-label">Fee</div>
                          <div className="optimizer-value-amount optimizer-value-negative">
                            {entry.annualFee > 0
                              ? `-${formatCurrency(entry.annualFee)}`
                              : '$0.00'}
                          </div>
                        </div>
                        <div className="optimizer-value-block">
                          <div className="optimizer-value-label">Net</div>
                          <div className="optimizer-value-amount optimizer-value-net">
                            {formatCurrency(entry.netAnnualValue)}
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default LineupOptimizerScreen;
