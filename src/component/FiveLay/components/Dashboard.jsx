import React, { useState } from 'react';
import '../App.css'
import UserCard from './UserCard';
import PostCard from './PostCard';

const Dashboard = ({ users = [], posts = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('');


  const categories = ['all', ...new Set(posts.map(post => post.category))];
  // mengambil semua category dari posts, menghilangkan duplikat dengan set, lalu menambahkan opsi 'all'

  const getFilteredPosts = () => {
    // fungsi untuk menfilter post 
    let filtered = [...posts];
    // shallow copy pada posts dan menyimpannya ke filtered

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
      // jika category bukan 'all', menyaring ssemua posts berdasarkan category yang dipilih 
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
        // jika searchTerm ada, meyaring potst berdasarkan title atau author (case-insensitive)
      );
    }

    return filtered;
    // mengembalikan hasil posts yang sudah difilter
  }

  const filteredPosts = getFilteredPosts();
  // memanggil fungsi filter dan menyimpan nya hasilnya ke filteredposts

  return (
    <div className="dashboard">
      <section className="users-section">
        <div className="users-grid">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </section>

      <section className="posts-section">
        <div className="posts-header">
          <h2 className="section-title">Popular Posts</h2>

          <div className="post-controls">
            <input
              type="text"
              placeholder='Search posts...'
              className='search-input'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select 
              onChange={(e) => setSelectedCategory(e.target.value)} 
              value={selectedCategory}
              className="categroy-select"
            >
              {categories.map(category => (
                <option value={category} key={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="posts-grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="no-result">No post found matching yout criteria</p>
        )}
      </section>
    </div>
  )
}

export default Dashboard