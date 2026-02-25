import React from 'react'
import Column from './Column'
import '../App.css'

const KanbanBoard = ({ columns, onUpdateStatus, onDeleteOrder }) => {
  const columnConfig = [
    { id: 'pending', title: '📝 Pending', color: '#4299e1' },
    { id: 'diproses', title: '⚡ Dalam Proses', color: '#ecc94b' },
    { id: 'selesai', title: '✅ Selesai', color: '#48bb78' }
  ];

  return (
    <div className="kanban-board">
      {columnConfig.map(column => {
        const { id, title, color } = column;

        return (
          <Column
            key={id}
            id={id}
            title={title}
            color={color}
            orders={columns[id] || []}
            onUpdateStatus={onUpdateStatus}
            onDeleteOrder={onDeleteOrder}
          />
        )
      })}
    </div>
  )
}

export default KanbanBoard