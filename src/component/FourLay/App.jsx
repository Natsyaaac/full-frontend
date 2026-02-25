import React, { useState, useEffect, useCallback } from 'react';
import './App.css'
import Loading from './components/Loading';
import Header from './components/Header';
import OrderForm from './components/OrderForm'
import KanbanBoard from './components/KanbanBoard';

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
      if (result.success) {
        setFoods(prevOrders => [...prevOrders, result.data]);
        setShowOrder(false);
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      alert('Gagal membuat order: ' + err.message)
    }
  };

  const groupOrderByStatus = useCallback(() => {
    return foods.reduce((acc, food) => {
      const { status, ...orderWithoutStatus } = food;

      if (!acc[status]) {
        acc[status] = []
      }

      acc[status] = [...acc[status], orderWithoutStatus];
      return acc

    }, { pending: [], diproses: [], selesai: [] })
  }, [foods])

  const handleUpdateOrderStatus = async (foodId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/foods/${foodId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();
      if (result.success) {
        setFoods(prevOrders =>
          prevOrders.map(food =>
            food.id === foodId
              ? { ...food, status: newStatus }
              : food
          )
        );
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      alert(`Gagal Update status: ` + err.message)
    }
  };

  const handleDeleteOrder = async (foodId) => {
    const confirmDelete = await new Promise((resolve) => {
      const result = window.confirm('Yakin ingin menghapus order ini');
      resolve(result)
    });

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/foods/${foodId}`, {
        method: 'DELETE',
      });

      const result = await response.json()

      if (result.success) {
        setFoods(prevOrders => prevOrders.filter(food => food.id !== foodId));
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      alert('Gagal menghapus task: ' + err.message)
    }
  };

  const groupedOrder = groupOrderByStatus();


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

      <main className="main-content">
        <KanbanBoard
          columns={groupedOrder}
          onUpdateStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
        />
      </main>
    </div>
  )
}

export default AppFoodOrders