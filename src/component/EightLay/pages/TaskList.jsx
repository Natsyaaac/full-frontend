import React from 'react'
import Taskitem from './TaskItem'
import '../App.css'

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#9ca3af" />
        </svg>
        <h3>No Tasks Found</h3>
        <p>Add a new task to get started!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <Taskitem 
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  )
};

export default TaskList;
