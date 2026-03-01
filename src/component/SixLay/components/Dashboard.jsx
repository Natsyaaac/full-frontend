import React, { useState } from 'react';
import '../App.css';
import User from './UserCard';
import PostBugs from './PostCard';

const Dashboard = ({ users = [], bugsPosts = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const categories = ['all', ...new Set(bugsPosts.map(bug => bug.category))];

  const getFilteredPosts = () => {
    let filtered = [...bugsPosts];

    if(selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(bug => 
        bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bug.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }

  const filteredBugPosts = getFilteredPosts();
  return (
    <div className="dashboard">
      <section className="user-section">
        <div className="users-grid">
           {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </div>
      </section>

      <section className="posts-section">
        <div className="posts-header">
          <h2 className="section-title">Popular Bugs</h2>

          <div className="post-controls">
            <input 
              type="text" 
              placeholder='Search Bug...'
              className='search-input'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select 
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              className='category-select'
            >
              {categories.map(category => (
                <option value={category} key={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="post-grid">
          {filteredBugPosts.map(post => (
            <PostBugs key={post.id} bugs={post} />
          ))}
        </div>

        {filteredBugPosts.length === 0 && (
          <p className="no-results">No Bugs found mathcing</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard