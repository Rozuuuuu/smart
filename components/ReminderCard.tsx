import { useState } from 'react'

export default function ReminderCard() {
  const [reminders, setReminders] = useState([])
  const [reminderText, setReminderText] = useState('')
  const [reminderTime, setReminderTime] = useState('')

  const addReminder = () => {
    if (reminderText && reminderTime) {
      setReminders([...reminders, { text: reminderText, time: reminderTime, completed: false }])
      setReminderText('')
      setReminderTime('')
    }
  }

  const toggleReminder = (index) => {
    const newReminders = [...reminders]
    newReminders[index].completed = !newReminders[index].completed
    setReminders(newReminders)
  }

  const deleteReminder = (index) => {
    const newReminders = reminders.filter((_, i) => i !== index)
    setReminders(newReminders)
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">Reminders</h2>
      <input
        type="text"
        value={reminderText}
        onChange={(e) => setReminderText(e.target.value)}
        placeholder="Enter reminder"
        className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
      />
      <input
        type="time"
        value={reminderTime}
        onChange={(e) => setReminderTime(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
      />
      <button onClick={addReminder} className="bg-green-700 text-white px-4 py-2 rounded w-full">
        Set Reminder
      </button>
      <ul className="mt-3">
        {reminders.map((reminder, index) => (
          <li key={index} className="flex items-center justify-between mb-2">
            <div>
              <input
                type="checkbox"
                checked={reminder.completed}
                onChange={() => toggleReminder(index)}
                className="mr-2"
              />
              <span className={reminder.completed ? 'line-through text-gray-500' : ''}>
                {reminder.text} at {reminder.time}
              </span>
            </div>
            <button onClick={() => deleteReminder(index)} className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

