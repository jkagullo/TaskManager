import { useState } from 'react'
import './App.css'
import TaskPage from './pages/TaskPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <TaskPage />
    </div>
  )
}

export default App
