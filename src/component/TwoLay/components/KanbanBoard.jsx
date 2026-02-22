import React from 'react'
import Column from './Column'
import '../App.css'

const KanbanBoard = ({ columns, onUpdateStatus, onDeleteTask }) => {
  const columnConfig = [
    { id: 'todo', title: '📝 To Do', color: '#4299e1' },
    { id: 'doing', title: '⚡ In Progress', color: '#ecc94b' },
    { id: 'done', title: '✅ Done', color: '#48bb78' }
  ];

  return (
    <div className="kanban-board">
      {columnConfig.map(column => {
        const { id , title, color } = column;

        return (
          <Column 
            key={id}
            id={id}
            title={title}
            color={color}
            tasks={columns[id] || []}
            onUpdateStatus={onUpdateStatus}
            onDeleteTask={onDeleteTask}
          /> 
        );
      })}
    </div>
  );
};

export default KanbanBoard