import { useState } from 'react'

export default function TodoList() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (index) => {
    const newTasks = [...tasks]
    newTasks[index].completed = !newTasks[index].completed
    setTasks(newTasks)
  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">To-Do List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
      />
      <button onClick={addTask} className="bg-green-700 text-white px-4 py-2 rounded w-full">
        Add Task
      </button>
      <ul className="mt-3">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center justify-between mb-2">
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
                className="mr-2"
              />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
            </div>
            <button onClick={() => deleteTask(index)} className="bg-red-500 text-white px-2 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

