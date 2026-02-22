import React, { useState } from 'react';

const TaskCard = ({ task, columnId, onDelete }) => {
  const { id, title, description, priority, createdAt } = task;

  const [isDragging, setIsDargging] = useState(false)
  // state boolean untuk menyimpan status apakah item sdang di drag (false)


  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date();
    const difftime = Math.abs(now - date);
    const diffDays = Math.ceil(difftime / (1000 * 60 * 60 * 24));
    // new Date(dateString) -> mengonversi string menjadi object Date.
    //new Date() -> mengambil waktu saat ini 
    // (now - date); -> megahsilkan selisih waktu dalam milidetik(numbet)
    // Math.abs mengubah hasil menjadi nilai absolut (hindari negatif)
    // (1000 * 60 * 60 * 24)) -> konversi milidetik menjadi hari 
    // Math.cell -> membulatkan ke atas agar selisih parsial tetap dihitung 1 hari 

    return diffDays === 1 ? '1 hari lalu' :
      diffDays < 7 ? `${diffDays} hari lalu` :
        date.toLocaleDateString('id-ID');
    // menggunakan nested ternary operator (? :)
    // jika selisih 1 hari  -> teks khusus
    // jika kurang 7 hari -> tampilkan jumlah hari
    // jika lebih dari 7 hari -> format tanggal lokal ind
  };

  const handleDargStart = (e) => {
    setIsDargging(true);
    e.dataTransfer.setData('taskId', id);
    e.dataTransfer.setData('sourceStatus', columnId);
    e.dataTransfer.effecAllowed = 'move';
    // dataTransfer adalh API browser untuk menyimpan data sementara selama proses drag
    // setData(key, value) menyimpan data berbentuk string 
    // data ini bisa diambil saat event drop 
    // menentukan tipe operasi drag yang diperbolehkan 'move' berarti item dipindahkan 
  };

  const handleDragEnd = () => {
    setIsDargging(false);
    // event handler untuk dragend
    // mengembalikan state ke false
    // digunakan untuk reset UI setelah proses drag selesai  
  };

  // Priority badge dengan objek mapping
  const priorityConfig = {
    high: { label: 'High', color: '#fc8181', bgColor: '#fff5f5' },
    medium: { label: 'Medium', color: '#ecc94b', bgColor: '#fffaf0' },
    low: { label: 'Low', color: '#68d391', bgColor: '#f0fff4' }
  };

  // Mengambil config priority dengan optional chaining
  const priorityStyle = priorityConfig[priority] || priorityConfig.medium;

  return (
    <div
      className={`task-card ${isDragging ? 'dragging' : ''}`}
      draggable
      onDragStart={handleDargStart}
      onDragEnd={handleDragEnd}
    >
      <div className="task-header">
        <h4>{title}</h4>
        <button
          className="delete-btn"
          onClick={() => onDelete(id)}
          aria-label='Hapus Task'
        >
          ×
        </button>
      </div>

      <p className="task-description">{description}</p>

      <div className="task-footer">
        <span className="priority-badge"
          style={{
            backgroundColor: priorityStyle.bgColor,
            color: priorityStyle.color,
            borderColor: priorityStyle.color
          }}
        >
          {priorityStyle.label}
        </span>
        <span className="task-date">
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard