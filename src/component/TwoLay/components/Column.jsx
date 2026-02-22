import React, { useState } from 'react'
import TaskCard from './TaskCard'
import '../App.css'

const Column = ({ id, title, color, task, onUpdateStatus, onDeleteTask }) => {

  const [isDarggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false)

    const sourceStatus = e.dataTransfer.getData('sourceStatus')
    const taskId = e.dataTransfer.getData('taskId');

    if (sourceStatus !== id) {
      onUpdateStatus(taskId, id);
    }
  };

  const taskCard = tasks.map(tsk => (
    <TaskCard
      key={task.id}
      task={task}
      columId={id}
      onDelete={onDeleteTask}
    />
  ));

  return (
    <div className="f">f</div>
  )
}