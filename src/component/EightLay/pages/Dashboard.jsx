import '../App.css'
import React, { useEffect, useState } from 'react';
import { fetchTasks, handleAddTask, handleUpdateTask, handleDeleteTask } from '../utils/api'


const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0
  })

  useEffect(() => {
    fetchTasks(setLoading, setError, setTasks)

    console.log('1. Start useEffect')
    Promise.resolve().then(() => {
      console.log('2. Microtask (Promise) di browser')
    })

    setTimeout(() => {
      console.log('3. Macrotask (setTimeout) di browser')
    }, 0)

    console.log('4. End useEffect')
  }, [])

  useEffect(() => {
    updateStats()
  }, [tasks])

  const updateStats = () => {
    const newStats = {
      total: tasks.length,
      completed: tasks.filter(task => task.completed).length,
      pending: tasks.filter(task => !task.completed).length,
      highPriority: tasks.filter(task => task.priority === 'high').length
    }
    setStats(newStats)
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault()

    if (!newTask.title.trim()) {
      setError('Title is required')
      return
    }

    await handleAddTask(newTask, setTasks, setError)
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    if (!id) {
      setError('Data tidak ditemukan')
      return
    }

    await handleUpdateTask(id, updates, setError, setTasks)
  }

  const handleDeleteSubmit = async (e) => {
    e.preventDefault()

    if (!id) {
      console.error('ID tidak ditemukan')
      return
    }

    await handleDeleteTask(id, setError, setTasks)
  }

  const filteredTasks = tasks
    .filter(task => {
      if (filter === 'completed') return task.completed
      if (filter === 'pending') return !task.completed
      return true
    })
    .filter(task => {
      if (!searchTerm) return true
      return task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    })
    .sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 }
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4)
    })

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="p">p</div>
  )
};

export default Dashboard;
