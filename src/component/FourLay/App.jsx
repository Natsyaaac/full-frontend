import React, { useState, useEffect, useCallback } from 'react';
import './App.css'
import Loading from './components/Loading';
import Header from './components/Header';
import OrderForm from './components/OrderForm'

const AppFoodOrders = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOrder, setShowOrder] = useState(false);

  const fetchFood = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/foods')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      if (result.success) {
        setFoods(result.data);
        setError(null)
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching Orders:', err)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const handleCreateOrder = async (orderData) => {
    try {
      const response = await fetch('http://localhost:5000/api/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json()
      if(result.success) {
        setFoods(prevOrders => [...prevOrders, result.data]);
        setShowOrder(false);
      } else {
        throw new Error(result.error)
      }
    } catch(err) {
      alert('Gagal membuat order: ' + err.message)
    }
  };

  if (loading) return <Loading />

  return (
    <div className="app-order">
      <Header 
        orderCount={foods.length}
        onAddOrder={() => setShowOrder(true)}
      />

    {error && (
      <div className="error-banner">
        <p>Error: {error}</p>
        <button onClick={fetchFood}>Coba Lagi</button>
      </div>
    )}

    {showOrder && (
      <OrderForm 
        onSubmit={handleCreateOrder}
        onClose={() => setShowOrder(false)}
      />
    )}
    </div>
  )
}

export default AppFoodOrders