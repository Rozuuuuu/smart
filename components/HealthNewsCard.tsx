import { useState, useEffect } from 'react'

interface NewsItem {
  title: string;
  link: string;
}

export default function HealthNewsCard() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchHealthNews = async () => {
    setLoading(true)
    setError('')
    const url = 'https://real-time-news-data.p.rapidapi.com/topic-news-by-section?topic=HEALTH&section=CAQiW0NCQVNQZ29JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURKdFpqRnVLaGtLRndvVFIwRkVSMFZVWDFORlExUkpUMDVmVGtGTlJTQUJLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB&limit=5&country=US&lang=en'
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'b26b104c34msh9495b1b24a94d98p1197dejsn39cebd6f78b2',
        'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
      }
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error('Failed to fetch health news')
      }
      const result = await response.json()
      if (result && result.data && Array.isArray(result.data)) {
        setNewsItems(result.data.slice(0, 5).map((item: any) => ({
          title: item.title,
          link: item.link
        })))
      } else {
        throw new Error('Invalid data format')
      }
    } catch (error) {
      console.error('Error fetching health news:', error)
      setError('Failed to fetch health news. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealthNews()
  }, [])

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">Health News</h2>
      <div className="h-48 flex flex-col items-start justify-start bg-green-100 rounded p-3 mb-3 overflow-y-auto">
        {loading ? (
          <p className="text-center w-full text-green-700">Loading health news...</p>
        ) : error ? (
          <p className="text-center w-full text-red-500">{error}</p>
        ) : newsItems.length > 0 ? (
          <ul className="w-full">
            {newsItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center w-full text-green-700">No health news available</p>
        )}
      </div>
      <button 
        onClick={fetchHealthNews} 
        className="bg-green-700 text-white px-4 py-2 rounded w-full hover:bg-green-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Get New Health News'}
      </button>
    </div>
  )
}

