import React, { useState, useEffect } from 'react';

interface StockRating {
  symbol: string;
  quant: string;
  wallStreet: string;
  seekingAlpha: string;
}

const StockNewsCard: React.FC = () => {
  const [stockRating, setStockRating] = useState<StockRating | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchStockInfo = async () => {
    setLoading(true);
    setError('');
    const url = 'https://seeking-alpha.p.rapidapi.com/symbols/get-ratings?symbol=aapl';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'aba79cb7a4msh4e9717b879b3f71p1556a0jsnf8b83c9a5d6b',
        'x-rapidapi-host': 'seeking-alpha.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch stock information');
      }
      const result = await response.json();
      setStockRating({
        symbol: result.symbol,
        quant: result.quantRating.score,
        wallStreet: result.wallStreetRating.score,
        seekingAlpha: result.seekingAlphaRating.score
      });
    } catch (error) {
      console.error('Error fetching stock information:', error);
      setError('Failed to fetch stock information. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockInfo();
  }, []);

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">AAPL Stock Rating</h2>
      <div className="h-48 flex flex-col items-start justify-start bg-blue-100 rounded p-3 mb-3 overflow-y-auto">
        {loading ? (
          <p className="text-center w-full text-blue-700">Loading stock information...</p>
        ) : error ? (
          <p className="text-center w-full text-red-500">{error}</p>
        ) : stockRating ? (
          <div className="w-full">
            <p className="font-bold text-lg mb-2">Symbol: {stockRating.symbol}</p>
            <ul>
              <li className="mb-1">
                <span className="font-semibold">Quant Rating:</span> {stockRating.quant}
              </li>
              <li className="mb-1">
                <span className="font-semibold">Wall Street Rating:</span> {stockRating.wallStreet}
              </li>
              <li className="mb-1">
                <span className="font-semibold">Seeking Alpha Rating:</span> {stockRating.seekingAlpha}
              </li>
            </ul>
          </div>
        ) : (
          <p className="text-center w-full text-blue-700">No stock information available</p>
        )}
      </div>
      <button 
        onClick={fetchStockInfo} 
        className="bg-blue-700 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Refresh Stock Information'}
      </button>
    </div>
  );
};

export default StockNewsCard;

