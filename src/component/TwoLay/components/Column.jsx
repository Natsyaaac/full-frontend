import React, { useState } from 'react'
import TaskCard from './TaskCard'
import '../App.css'

const Column = ({ id, title, color, tasks, onUpdateStatus, onDeleteTask }) => {

  const [isDarggingOver, setIsDraggingOver] = useState(false);
  // state boolean untuk menyimpan status apakah elemen sedang didrag atau atar area drop

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
    // event hanlder untuk venet dragover
    // preventdefault() wajibb agar event drop bisa dijalankan
    // state diubah menjadi true saat item berada diatas drop zone
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false)
    // event handler untuk dragleave
    // mengebalikan state menjadi false saat kursor keluar dari drop zone
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false)
    // event hanlder untuk drop
    // preventDefault mencegah behaior default browser
    //resset status drag

    const sourceStatus = e.dataTransfer.getData('sourceStatus')
    const taskId = e.dataTransfer.getData('taskId');
    // mengambil data yang disimpan saat dragstart
    // datatransfer adalah API bawaan browser untuk drag & drop
    // getData() mengembalikan string 

    if (sourceStatus !== id) {
      onUpdateStatus(taskId, id);
    }
    // membandikan status asal dengan kolom tujuan
    // jika berbeda -> panggil fungsi update
    // mencegah update jika dijatuhkan di kolom yang smaa 
  };

  
  const taskCard = tasks.map(task => (
    <TaskCard
      key={task.id}
      task={task}
      columId={id}
      onDelete={onDeleteTask}
    />
    // map() melakuak iterasi terhadap array tasks
    // mengahsilkan array baru yang berisi elemen <taskCard/>
    // key digunakan React untuk indentifikasi unik
  ));

  return (
    <div 
      className={`column ${isDarggingOver ? 'drag-over' : ''}`}
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
        <span className="task-count">{tasks.length}</span>
      </div>

      <div className="column-content">
        {taskCard}

        {tasks.length === 0 && (
          <div className="empty-state">
            <p>Tidak ada task</p>
            <small>Drag task kesini atau Membuat yang baru</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default Column