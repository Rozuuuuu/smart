import { useState, useEffect } from 'react'

const funFacts = [
  "The shortest war in history lasted 38 minutes.",
  "A group of flamingos is called a 'flamboyance'.",
  "The world's oldest known living tree is over 5,000 years old.",
  "Honeybees can recognize human faces.",
  "The longest word in the English language has 189,819 letters.",
  // ... Add 95 more fun facts here
]

export default function FunFactCard() {
  const [funFact, setFunFact] = useState('')

  const getNewFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length)
    setFunFact(funFacts[randomIndex])
  }

  useEffect(() => {
    getNewFact()
  }, [])

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">Fun Fact</h2>
      <div className="h-32 flex items-center justify-center bg-green-100 rounded p-3 mb-3">
        <p className="text-center text-green-700">{funFact}</p>
      </div>
      <button onClick={getNewFact} className="bg-green-700 text-white px-4 py-2 rounded w-full">
        Get New Fact
      </button>
    </div>
  )
}

