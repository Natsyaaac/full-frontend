import React, { useState } from 'react';
import OrderCard from './OrderCard';
import '../App.css'

const Column = ({ id, title, color, orders, onUpdateStatus, onDeleteOrder }) => {

  const [isDraggingOver, setIsDraggingOver] = useState(false);

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
    const foodId = e.dataTransfer.getData('orderId');

    if (sourceStatus !== id) {
      onUpdateStatus(foodId, id)
    }
  };

 const orderCard = orders.map(order => (
  <OrderCard
    key={order.id}
    order={order}
    columnId={id}
    onDelete={onDeleteOrder}
  />
 ))

  return (
    <div
      className={`column ${isDraggingOver ? 'drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header"
        style={{
          background: color
        }}
      >
        <h3>{title}</h3>
        <span className="task-count">{orders.length}</span>
      </div>

      <div className="column-content">
        {orderCard}

        {orders.length === 0 && (
          <div className="empty-state">
            <p>Tidak ada order</p>
            <small>Dag order kesini atau membuat yang baru</small>
          </div>
        )}
      </div>
    </div>
  )
}

export default Column