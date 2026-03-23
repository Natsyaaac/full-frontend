import axios from "axios";


export const fetchTasks = async ({ setLoading, setError, setTasks }) => {
  try {
    setLoading(true)
    setError(null)

    const { data } = await axios.get('http://localhost:3001/api/tasks', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (data && data.data && Array.isArray(data.data)) {
      setTasks(data.data)
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    setError(error.response?.data?.message || 'Failed to fecth tasks')
    console.error('Error fetching tasks:', error)
  } finally {
    setLoading(false)
  }
}

export const handleAddTask = async ({ newTask, setTasks, setError }) => {
  try {
    const { data } = await axios.post('http://localhost:3001/api/tasks',
      // Implementasi spread operator
      { ...newTask, createdAt: new Date().toISOString() },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    if (data && data.data) {
      setTasks(prevTask => [...prevTask, data.data])
      return data
    }
  } catch (error) {
    setError('Failed to add task')
    console.error('Error adding taask:', error)
    throw error
  }
}

export const handleUpdateTask = async ({ id, updates, setError, setTasks }) => {
  try {
    const { data } = await axios.put(`http://localhost:3001/api/tasks/${id}`,
      updates,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    )

    if (data && data.data) {
      setTasks(prevTask =>
        prevTask.map(task =>
          task.id === id ? { ...task, ...updates } : task
        )
      )
    }
  } catch (err) {
    if (setError) setError('Failed to updates task')
    console.error('Error updating task:', err)
  }
}


export const handleDeleteTask = async ({ id, setError, setTasks }) => {
  try {
    const { data } = await axios.delete(`http://localhost:3001/api/tasks/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (data && data.data) {
      setTasks(prevTask => prevTask.filter(task => task.id !== id))
    }
  } catch (err) {
    setError('Failed to delete task')
    console.error('Error deleting task:', err)
  }
}

