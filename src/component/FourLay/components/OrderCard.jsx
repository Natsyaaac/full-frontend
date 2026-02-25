import React, { useState } from "react"

const OrderCard = ({ order, columnId, onDelete }) => {
  const { id, title, note, priority, createdAt } = order;
  const [isDragging, setIsDragging] = useState(false)

  const formateDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date();
    const difftime = Math.abs(now - date);
    const diffDays = Math.ceil(difftime / (1000 * 60 * 60 * 24));

    return diffDays === 1 ? '1 hari yang lalu' :
      diffDays < 7 ? `${diffDays} hari yang lalu` :
        date.toLocaleDateString('id-ID')
  };

  const handleDragStart = (e) => {
    setIsDragging(true)
    e.dataTransfer.setData('orderId', id);
    e.dataTransfer.setData('sourceStatus', columnId);
    e.dataTransfer.effecAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false)
  };

  const priorityConfig = {
    high: { label: 'High', color: '#fc8181', bgColor: '#fff5f5' },
    medium: { label: 'Medium', color: '#ecc94b', bgColor: '#fffaf0' },
    low: { label: 'Low', color: '#68d391', bgColor: '#f0fff4' }
  };

  const priorityStyle = priorityConfig[priority] || priorityConfig.diproses;

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="task-header">
        <h4>{title}</h4>
        <button
          className="delete-btn"
          onClick={() => onDelete(id)}
          aria-label='Hapus order'
        >
          ×
        </button>
      </div>

      <p className="order-note">{note}</p>

      <div className="order-footer">
        <span className="priority-badge"
          style={{
            background: priorityStyle.bgColor,
            color: priorityStyle.color,
            borderColor: priorityStyle.color
          }}
        >
          {priorityStyle.label}
        </span>
        <span className="task-date">
          {formateDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default OrderCard