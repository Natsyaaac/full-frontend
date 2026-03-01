import React, { useState } from 'react';
import '../App.css'
import UserCard from './UserCard';

const Dashboard = ({ users= [], posts = []}) => {
  return (
    <div className="dashboard">
      <section className="users-section">
        <div className="users-grid">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard