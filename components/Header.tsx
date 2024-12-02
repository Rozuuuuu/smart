import { useState } from 'react'

export default function Header({ userName, setUserName }) {
  const [inputName, setInputName] = useState('')

  const handleSaveName = () => {
    if (inputName) {
      localStorage.setItem('userName', inputName)
      setUserName(inputName)
      alert('Name saved!')
    }
  }

  return (
    <header className="text-center mb-5">
      <h1 className="text-3xl font-bold mb-3">Personal Assistant</h1>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Enter your name"
        className="border border-gray-300 rounded px-3 py-2 mr-2"
      />
      <button onClick={handleSaveName} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors">
        Save
      </button>
      {userName && <p className="mt-3 text-xl font-bold">How may I assist you today, {userName}!</p>}
    </header>
  )
}

