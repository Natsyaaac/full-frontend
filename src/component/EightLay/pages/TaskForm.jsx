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

  const validateForm = () => {
    const newErrors = {}

    if (formData.title == '') {
      newErrors.title = 'Title is required'
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must ne at least 3 characters'
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await onAddTask(formData)

      setFormData({
        title: '',
        description: '',
        priority: 'medium'
      })
    } catch (error) {
      console.error('Error submiting form:', error)
    }
  }

  return (
    <div className="task-form-container">
      <h2>Add New Task</h2>

      <form
        onSubmit={handleSubmit}
        className='task-form'
      >
        <div className="form-group-dashboard">
          <label htmlFor="title">
            Title <span className='required'>*</span>
          </label>
          <input
            type="text"
            id='title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            placeholder='Enter task title'
            className={errors.title ? 'error' : ''}
          />
          {
            errors.title && (
              <span className="error-message">
                {errors.title}
              </span>
            )
          }
        </div>
        <div className="form-group-dashboard">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder='Enter task description (optional)'
            rows='3'
            className={errors.description ? 'error' : ''}
          />
          {
            errors.description && (
              <span className="error-message">
                {errors.description}
              </span>
            )
          }
        </div>
        <div className="form-group-dashboard">
          <label htmlFor="priority">Priority</label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button className="submit-btn"
          type='submit'
        >
          Add Task
        </button>
      </form>
    </div>
  )
};

export default TaskForm;
