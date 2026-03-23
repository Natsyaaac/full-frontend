import React, { useState } from 'react'
import '../App.css'


const TaskItem = ({ task, onUpdateTask, onDeleteTask, setError, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)
  const { id, title, description, priority, completed } = task

  const handleToggleComplete = async () => {
    try {
      await onUpdateTask(id, { completed: !completed }, setError, setTasks)
    } catch (error) {
      console.error('Error toggling task:', error)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    try {
      await onUpdateTask(id, {
        title: editedTask.title,
        description: editedTask.description,
        priority: editedTask.priority
      }, setError, setTasks)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handelCancel = () => {
    setEditedTask(task)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await onDeleteTask(id, setError, setTasks)
      } catch (error) {
        console.error('Error deleting task:', error)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedTask(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high'
      case 'medium':
        return 'priority-medium'
      case 'low':
        return 'priority-low'
      default:
        return ''
    }
  }

  if (isEditing) {
    return (
      <div className={`task-item editing ${getPriorityClass(editedTask.priority)}`}>
        <div className="task-edit-form">
          <input
            type="text"
            name='title'
            value={editedTask.title}
            onChange={handleChange}
            className='edit-title'
            placeholder='Task title'
          />

          <textarea
            name="description"
            value={editedTask.description || ''}
            onChange={handleChange}
            className='edit-description'
            placeholder='Task deescription'
            rows='2'
          />

          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            className='edit-priority'
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <div className="edit-actions">
            <button onClick={handleSave} className='save-btn'>
              Save
            </button>
            <button onClick={handelCancel} className='cancel-btn'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`task-item ${completed ? 'completed' : ''} ${getPriorityClass(priority)}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggleComplete}
          id={`task-${id}`}
        />
        <label htmlFor={`task-${id}`}></label>
      </div>

      <div className="task-content">
        <h3 className="task-title">{title}</h3>
        {description && (
          <p className="task-description">{description}</p>
        )}

        <div className="task-meta">
          <span className={`task-priority ${getPriorityClass(priority)}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={handleEdit} className="edit-btn" title="Edit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>

        <button onClick={handleDelete} className="delete-btn" title="Delete">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </div>
  )
};

export default TaskItem;
