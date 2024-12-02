import React, { useState, useEffect } from 'react';

interface NewsItem {
  title: string;
  link: string;
  publishedAt: string;
}

const NewsCard: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchNews = async () => {
    setLoading(true);
    setError('');
    const url = 'https://seeking-alpha.p.rapidapi.com/news/v2/list-trending?until=0&since=0&size=5';
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
        throw new Error('Failed to fetch news');
      }
      const result = await response.json();
      setNews(result.data.map((item: any) => ({
        title: item.attributes.title,
        link: item.links.self,
        publishedAt: new Date(item.attributes.publishOn).toLocaleString()
      })));
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">Trending News</h2>
      <div className="h-48 flex flex-col items-start justify-start bg-blue-100 rounded p-3 mb-3 overflow-y-auto">
        {loading ? (
          <p className="text-center w-full text-blue-700">Loading news...</p>
        ) : error ? (
          <p className="text-center w-full text-red-500">{error}</p>
        ) : news.length > 0 ? (
          <ul className="w-full">
            {news.map((item, index) => (
              <li key={index} className="mb-2">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {item.title}
                </a>
                <p className="text-xs text-gray-500">{item.publishedAt}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center w-full text-blue-700">No news available</p>
        )}
      </div>
      <button 
        onClick={fetchNews} 
        className="bg-blue-700 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Refresh News'}
      </button>
    </div>
  );
};

export default NewsCard;

