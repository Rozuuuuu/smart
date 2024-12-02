'use client'

import { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import TodoList from '../components/TodoList'
import WeatherCard from '../components/WeatherCard'
import QuoteCard from '../components/QuoteCard'
import ReminderCard from '../components/ReminderCard'
import NewsCard from '../components/NewsCard'
import FunFactCard from '../components/FunFactCard'

export default function Home() {
  const [userName, setUserName] = useState('')
  const [startX, setStartX] = useState(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const cardContainerRef = useRef(null)

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - cardContainerRef.current.offsetLeft)
    setScrollLeft(cardContainerRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!startX) return
    const x = e.touches[0].pageX - cardContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    cardContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setStartX(null)
  }

  return (
    <div className="p-5">
      <Header userName={userName} setUserName={setUserName} />
      <div 
        ref={cardContainerRef}
        className="card-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <TodoList />
        <WeatherCard />
        <QuoteCard />
        <ReminderCard />
        <NewsCard />
        <FunFactCard />
      </div>
    </div>
  )
}

