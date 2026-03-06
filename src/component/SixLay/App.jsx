import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchPostBug, fetchUsers } from './util/api'

const App = () => {
  const [user, setUsers] = useState([]);
  const [postBugs, setPostBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all')

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

  return (
    <div className="">p</div>
  );
};

export default App