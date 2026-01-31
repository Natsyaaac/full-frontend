import React, { useState } from "react";
import './Grid.css';

function AppGridLayout() {
  const [theme, setTheme] = useState('light');
  const [selectedCard, setSelectedCard] = useState(null);
  const [gridColumns, setGridColumns] = useState(3);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const products = [
    { id: 1, name: 'Laptop Pro', price: '$1299', category: 'Electronics' },
    { id: 2, name: 'Desk Chair', price: '$299', category: 'Furniture' },
    { id: 3, name: 'Wireless Mouse', price: '$49', category: 'Electronics' },
    { id: 4, name: 'Notebook Set', price: '$24', category: 'Stationery' },
    { id: 5, name: 'Desk Lamp', price: '$89', category: 'Furniture' },
    { id: 6, name: 'USB-C Hub', price: '$79', category: 'Electronics' },
  ];

  return (
    <div className={`app-container ${theme}`}>
      <header className="header">
        <h1>Modern Product Showcase</h1>
        <p>Contoh penggunaan Grid, Flexbox, dan useState</p>
      </header>

      <div className="controls">
        {/* ============================
            useState - Bagian 2 dari 3
            ============================
            Menggunakan state untuk mengontrol tema 
        */}

        <button className="theme-toggle" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>

        <div className="grid-controls">
          <p>Grid Colums {gridColumns}</p>
          <button onClick={() => setGridColumns(prev => Math.max(2, prev - 1))}>-</button>
          <button onClick={() => setGridColumns(prev => Math.min(5, prev + 1))}>+</button>
        </div>
      </div>

      <main className="main-content">
        {/* ============================
            Grid - Bagian 1 dari 3
            ============================
            Menggunakan CSS Grid untuk layout utama 
        */}

        <div className="product-grid"
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}>
          {products.map(product => (
            <div
              key={product.id}
              className={`product-card ${selectedCard === product.id ? 'selected' : ''}`}
              onClick={() => {
                // ============================
                // useState - Bagian 3 dari 3
                // ============================
                // Mengupdate state ketika kartu diklik
                setSelectedCard(product.id)
              }}
            >
              <div className="product-image">
                <div className="image-placeholder">📷</div>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <p className="category">{product.category}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>

        <div className="sidebar">
          {/* ============================
              Flexbox - Bagian 1 dari 3
              ============================
              Menggunakan Flexbox untuk layout sidebar 
          */}
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="category-list">
              <button className="category-tag active">
                all
              </button>
              <button className="category-tag">Electronics</button>
              <button className="category-tag">Furniture</button>
              <button className="category-tag">Stationery</button>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Selected Product</h3>
            {selectedCard ? (
              <div className="selected-product">
                <p><strong>ID:</strong> {selectedCard}</p>
                <p><strong>Name:</strong> {products.find(p => p.id === selectedCard)?.name}</p>
                <p><strong>Price:</strong> {products.find(p => p.id === selectedCard)?.price}</p>
              </div>
            ) : (
              <p>No porduct selected</p>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        {/* ============================
            Flexbox - Bagian 2 dari 3
            ============================
            Menggunakan Flexbox untuk layout footer 
        */}
        <div className="footer-content">
          <div className="footer-section">
            <h4>About This Demo</h4>
            <p>This demo showcase Grid, Flexbox, and useState in modern web layout.</p>
          </div>

          <div className="footer-section">
            <h4>Technologies Used</h4>
            <ul>
              <li>CSS Grid for main layout</li>
              <li>Flexbox for component alignment</li>
              <li>React useState for state management</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>State Information</h4>
            <p>Current theme: <strong>{theme}</strong></p>
            <p>Grid columns: <strong>{gridColumns}</strong></p>
            <p>Selected card: <strong>{selectedCard || 'None'}</strong></p>
          </div>
        </div>
      </footer>
    </div>
  )

}

export default AppGridLayout