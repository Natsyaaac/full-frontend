import React, { useState } from 'react';
import './Grid.css'

function LearnApp() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark')
  }

  const products = [
    { id: 1, name: 'Laptop Pro', price: '$1299', category: 'Electronics' },
    { id: 2, name: 'Desk Chair', price: '$299', category: 'Furniture' },
    { id: 3, name: 'Wireless Mouse', price: '$49', category: 'Electronics' },
    { id: 4, name: 'Notebook Set', price: '$24', category: 'Stationery' },
    { id: 5, name: 'Desk Lamp', price: '$89', category: 'Furniture' },
    { id: 6, name: 'USB-C Hub', price: '$79', category: 'Electronics' },
  ];

  return (
    <div className={`container ${theme}`}>
      <header className="header-layout">
        <h3>Modern Product Showcase</h3>
        <p>Contoh penggunaan Grid, Flexbox, dan useState</p>
      </header>


      <div className="controls">
        <div className="grid-controls">
          <button onClick={toggleTheme} className='toggle'>
            Switch to {theme === 'light' ? 'Light' : 'Dark'} theme
          </button>
        </div>

        <main className="main-content">
          <div className="product-container">
            {products.map(product => (
              <div className='produk-main' key={product.id}>
                <h3>{product.name}</h3>

                <div className="produk-desc">
                  <p>{product.category}</p>
                  <span>{product.price}</span>
                </div>
              </div>
            ))}</div>
        </main>
      </div>
    </div>
  )
}

export default LearnApp;