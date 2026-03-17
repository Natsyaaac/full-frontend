import React, { useState } from 'react'
import '../App.css'

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>
    </div>
  )
};

export default TaskForm;
