import React, { useState } from 'react';
import './Grid.css';


function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Belajar React Hooks', completed: false },
    { id: 2, text: 'Praktik CSS Grid', completed: false },
    { id: 3, text: 'Buat Flexbox Layout', completed: false },
  ]);


  const [isEditing, setEditing] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (newTodo.trim() === '') return;

    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };


    setTodos([...todos, newTodoItem]);
    setNewTodo('')
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos)
  };

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

 const editTodos = (id) => {
  const editTodos = todos.filter(todo => todo.id == id);
  setTodos(...todos, newTodoItem)
  setTodos(editTodos)
  
 }

  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    setTodos(activeTodos);
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  return (
    <>
      <div className="todo-app">
        <div className="todo-container">
          {/* ====================
          GRID - Layout utama
          ==================== */}
          <header className="todo-header">
            <h1>📃 Todo List App</h1>
            <p>Contoh sederhana Grid, Flexbox, useState</p>
          </header>


          {/* ====================
            FLEXBOX - Input section
            ==================== */}
          <div className="input-section">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder='Tambahkan todo baru...'
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}>Tambah</button>
          </div>

          {/* ====================
            FLEXBOX - Filter buttons
            ==================== */}
          <div className="filter-section">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              Semua({todos.lenghth})
            </button>

            <button
              className={filter === 'active' ? 'active' : ''}
              onClick={() => setFilter('active')}
            >
              Aktive({todos.filter(t => !t.completed).length})
            </button>

            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              selesai ({todos.filter(t => t.completed).length})
            </button>
          </div>


          {/* ====================
            GRID - Todo list items
            ==================== */}
          <div className="todo-list">
            {filteredTodos.length === 0 ? (
              <p className="empty-message">Tidak Ada Todo</p>
            ) : (
              filteredTodos.map(todo => (
                <div
                  key={todo.id}
                  className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                  {/* ====================
                    FLEXBOX - Todo item layout
                    ==================== */}

                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}

                    />
                    {isEditing ? (
                      <><h4>Edit teks</h4><input type="text"
                        value={todo.text}
                        onChange={(e) => setTodos(e.target.value)} /></>
                    ) : (
                      <span className="todo-text">{todo.text}</span>
                    )}
                  </div>

                  <div className="setting-todo">
                    <div className="">

                    </div>
                    <button
                      className='update-btn'
                      onClick={() => setEditing(!isEditing)}>
                      {isEditing ? 'Simpan' : 'Edit'}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* ====================
            FLEXBOX - Summary section
            ==================== */}
          <div className="summary-section">
            <div className="summary-item">
              <span className="summary-label">Total:</span>
              <span className="summary-value">{todos.length}</span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Selesai</span>
              <span className="summary-value"> {todos.filter(t => t.completed).length}
              </span>
            </div>

            <div className="summary-item">
              <span className="summary-label">Persentase:</span>
              <span className="summary-value">
                {todos.length > 0
                  ? `${Math.round((todos.filter(t => t.completed).length / todos.length) * 100)} %` : '0%'}
              </span>
            </div>
          </div>
          <div className="action-section">
            <button className="clear-btn"
              onClick={clearCompleted}
            >
              Hapus yang selesai
            </button>
          </div>


          {/* ====================
            GRID - Stats grid
            ==================== */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Penggunaan State</h3>
              <ul>
                <li><code>todos</code>: Array of objects</li>
                <li><code>newTodo</code>: String input</li>
                <li><code>filter</code>: String untuk filter</li>
              </ul>
            </div>

            <div className="stat-card">
              <h3>Grid vs Flexbox</h3>
              <ul>
                <li><strong>Grid</strong>: Layout utama</li>
                <li><strong>Flexbox</strong>: Alignment dalam komponen</li>
              </ul>
            </div>

            <div className="stat-card">
              <h3>Tips useState</h3>
              <ul>
                <li>Jangan modifikasi state langsung</li>
                <li>Gunakan spread operator untuk array/object</li>
                <li>Functional update jika perlu nilai sebelumnya</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoApp;