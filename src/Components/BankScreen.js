import React, { useEffect, useState } from 'react'
import Card from './Card'
import RowScreen from './RowScreen';
import { fetchGraphqlCached, getCachedGraphqlData } from '../Utils/graphqlClient';

const S3_IMAGE_BASE_URL = process.env.REACT_APP_S3_IMAGE_BASE_URL || 'https://abhinav-credit-card-images-2.s3.us-west-1.amazonaws.com/';

const BANK_ROWS_QUERY = `
  query BankRows($size: Int!) {
    chase: cards(page: 0, size: $size, bank: "Chase") {
      content {
        id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        relatedCardsByBank(limit: 3) {
          id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        }
      }
    }
    citi: cards(page: 0, size: $size, bank: "Citi") {
      content {
        id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        relatedCardsByBank(limit: 3) {
          id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        }
      }
    }
    amex: cards(page: 0, size: $size, bank: "Amex") {
      content {
        id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        relatedCardsByBank(limit: 3) {
          id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        }
      }
    }
    capitalOne: cards(page: 0, size: $size, bank: "Capital One") {
      content {
        id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        relatedCardsByBank(limit: 3) {
          id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        }
      }
    }
    wellsFargo: cards(page: 0, size: $size, bank: "Wells Fargo") {
      content {
        id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        relatedCardsByBank(limit: 3) {
          id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        }
      }
    }
    bankOfAmerica: cards(page: 0, size: $size, bank: "Bank of America") {
      content {
        id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        relatedCardsByBank(limit: 3) {
          id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        }
      }
    }
    discover: cards(page: 0, size: $size, bank: "Discover") {
      content {
        id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        relatedCardsByBank(limit: 3) {
          id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key
        }
      }
    }
  }
`;

const BANK_ROWS_QUERY_FALLBACK = `
  query BankRowsFallback($size: Int!) {
    chase: cards(page: 0, size: $size, bank: "Chase") {
      content { id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key }
    }
    citi: cards(page: 0, size: $size, bank: "Citi") {
      content { id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key }
    }
    amex: cards(page: 0, size: $size, bank: "Amex") {
      content { id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key }
    }
    capitalOne: cards(page: 0, size: $size, bank: "Capital One") {
      content { id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key }
    }
    wellsFargo: cards(page: 0, size: $size, bank: "Wells Fargo") {
      content { id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key }
    }
    bankOfAmerica: cards(page: 0, size: $size, bank: "Bank of America") {
      content { id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key }
    }
    discover: cards(page: 0, size: $size, bank: "Discover") {
      content { id cardName cardType cardBank hasAnnualFee rating imageSourceUrl imageS3Key }
    }
  }
`;

function resolveImageUrl(graphqlCard) {
  if (graphqlCard.imageSourceUrl) return graphqlCard.imageSourceUrl;
  if (graphqlCard.imageS3Key) {
    if (graphqlCard.imageS3Key.startsWith('http://') || graphqlCard.imageS3Key.startsWith('https://')) {
      return graphqlCard.imageS3Key;
    }
    return `${S3_IMAGE_BASE_URL}${graphqlCard.imageS3Key}`;
  }
  return `https://dummyimage.com/220x140/1f2937/ffffff&text=${encodeURIComponent(graphqlCard.cardName)}`;
}

function toCard(graphqlCard) {
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

function BankScreen() {
  const [banks, setBanks] = useState({
    chase: [],
    citi: [],
    amex: [],
    capitalOne: [],
    wellsFargo: [],
    bankOfAmerica: [],
    discover: [],
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const queryVariables = { size: 300 };

    function applyBankData(data) {
      setBanks({
        chase: (data?.chase?.content || []).map(toCard),
        citi: (data?.citi?.content || []).map(toCard),
        amex: (data?.amex?.content || []).map(toCard),
        capitalOne: (data?.capitalOne?.content || []).map(toCard),
        wellsFargo: (data?.wellsFargo?.content || []).map(toCard),
        bankOfAmerica: (data?.bankOfAmerica?.content || []).map(toCard),
        discover: (data?.discover?.content || []).map(toCard),
      });
    }

    async function loadBanks() {
      try {
        setErrorMessage('');

        const cachedData = getCachedGraphqlData(BANK_ROWS_QUERY, queryVariables);
        setLoading(!cachedData);
        if (cachedData) {
          applyBankData(cachedData);
        }

        const data = await fetchGraphqlCached({
          query: BANK_ROWS_QUERY,
          variables: queryVariables,
          signal: controller.signal,
        });

        applyBankData(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          return;
        }

        try {
          const fallbackData = await fetchGraphqlCached({
            query: BANK_ROWS_QUERY_FALLBACK,
            variables: queryVariables,
            signal: controller.signal,
          });
          applyBankData(fallbackData);
          setErrorMessage('');
        } catch (fallbackError) {
          if (fallbackError.name !== 'AbortError') {
            setErrorMessage('Unable to load bank rows right now.');
          }
        }
      } finally {
        setLoading(false);
      }
    }

    loadBanks();
    return () => controller.abort();
  }, []);

  return (
    <div>
      {loading && <p>Loading cards...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <div className="mt-5">
        <RowScreen title="Chase" cards={banks.chase}/>
      </div>
      <div className="mt-5">
        <RowScreen title="Citi" cards={banks.citi}/>
      </div>
      <div className="mt-5">
        <RowScreen title="Amex" cards={banks.amex}/>
      </div>
      <div className="mt-5">
        <RowScreen title="Capital One" cards={banks.capitalOne}/>
      </div>
      <div className="mt-5">
        <RowScreen title="Wells Fargo" cards={banks.wellsFargo}/>
      </div>
      <div className="mt-5">
        <RowScreen title="Bank of America" cards={banks.bankOfAmerica}/>
      </div>
      <div className="mt-5">
        <RowScreen title="Discover" cards={banks.discover}/>
      </div>
    </div>
  )
}

export default BankScreen