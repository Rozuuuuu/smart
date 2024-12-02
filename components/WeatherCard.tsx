import { useState, useEffect } from 'react'
import Image from 'next/image'

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    setLoading(true)
    setError('')
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Cebu,ph&appid=YOUR_API_KEY&units=metric'

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }
      const data = await response.json()
      setWeatherData(data)
    } catch (error) {
      console.error('Error fetching weather:', error)
      setError('Failed to fetch weather data. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">Weather in Cebu, Philippines</h2>
      <div className="h-48 flex flex-col items-center justify-center bg-yellow-100 rounded p-3 mb-3">
        {loading ? (
          <p className="text-center text-yellow-700">Loading weather data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : weatherData ? (
          <>
            <Image 
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              width={100}
              height={100}
            />
            <p className="text-3xl font-bold text-yellow-700">{weatherData.main.temp.toFixed(1)}°C</p>
            <p className="text-lg text-yellow-600 capitalize">{weatherData.weather[0].description}</p>
            <p className="text-sm text-yellow-600">Humidity: {weatherData.main.humidity}%</p>
          </>
        ) : (
          <p className="text-center text-yellow-700">No weather data available</p>
        )}
      </div>
      <button 
        onClick={fetchWeather} 
        className="bg-yellow-500 text-white px-4 py-2 rounded w-full hover:bg-yellow-600 transition-colors"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Refresh Weather'}
      </button>
    </div>
  )
}

