import { useState, useEffect } from 'react'

const quotes = [
  { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { content: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  // ... Add 95 more quotes here
]

export default function QuoteCard() {
  const [quote, setQuote] = useState(null)
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    setCurrentDate(formattedDate)

    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
    setQuote(quotes[dayOfYear % quotes.length])
  }, [])

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">Daily Quote</h2>
      <p className="text-sm text-gray-500 mb-2">{currentDate}</p>
      {quote && (
        <p className="text-center text-green-700 font-bold">
          "{quote.content}" - {quote.author}
        </p>
      )}
    </div>
  )
}

