import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchPostBug, fetchUsers } from './util/api'
import Header from './components/Header'
import Dashboard from './components/Dashboard';

const App = () => {
  const [users, setUsers] = useState([]);
  const [postBugs, setPostBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersData, bugsPostData] = await Promise.all([
          fetchUsers(),
          fetchPostBug()
        ]);

        setUsers(usersData)
        setPostBugs(bugsPostData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false)
      }
    };

    loadData();
  }, [])


  const getFilteredUsers = () => {
    switch (activeFilter) {
      case 'active':
        return users.filter(user => user.active);
      case 'inactive':
        return users.filter(user => !user.active);
      default:
        return users;
    }
  }

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.active).length,
    totalBugPosts: postBugs.length,
    totalLikes: postBugs.reduce((acc, post) => acc + post.likes, 0),
    categories: [...new Set(postBugs.map(post => post.category))]
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error :</div>

  console.log(stats)
  return (
    <div className="app">
      <Header 
        stats={stats}
        onFilterChange={setActiveFilter}
        currentFilter={activeFilter}
      />

      <Dashboard
        users={getFilteredUsers()}
        bugsPosts={postBugs}
      />
    </div>
  );
}

export default App