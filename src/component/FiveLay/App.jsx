import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchPosts, fetchUsers } from './util/api';
import Header from './components/Header';


const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // useeffect dijalankan sekali saat komponen pertamakali mount karena dependency array kosong 
    const loadData = async () => {
      // fungsi dengan async  yang mengembalikan promise dan digunakan untu menangani operasi async 
      try {
        setLoading(true);
        // try dugunakan menanggkap error yang mungkin terjadi saat proses asycn 
        // setloading true menandakan proses fetch sedang berlangsung 

        const [usersData, postsData] = await Promise.all([
          fetchUsers(),
          fetchPosts()
        ]);
        // Promise.all menjalankan fetchUsers dan fetchPosts secara pararel, menungggu kedua promise selesai, hasil array di destructing menjadi usersData dan postsData

        setUsers(usersData);
        setPosts(postsData);
        // menyimpan hasil resolved Promise ke state users dan posts

        setError(null);
        // error direset menjadi null karena proses berhasil  
      } catch (err) {
        setError(err.message);
        // menangkap error jika salah satu Promise reject, dan menyimpan pesan error ke state error
      } finally {
        setLoading(false)
        // finnaly selalu dijalankan baik sukses maupun gagal untuk menghetikan loading  
      }
    };

    loadData();
  }, [])

  const getFilteredUsers = () => {
    // function untuk mengembalikan array users berdasarkan nilai activeFilter
    switch (activeFilter) {
      case 'active':
        return users.filter(user => user.active);
      case 'inactive':
        return users.filter(user => !user.active);
      default:
        return users;
      // menggunakan swicth case untuk menfilter user
      // menyaring user dengan properti active bernilai true dan menghasilkan array baru
      // menyaring user dengan properti active bernilai false dan menghasilkan array baru 
      // jika tidak ada filter aktif, kembalikan seluruh array users tanpa modifikasi 
    }
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.active).length,
    totalPosts: posts.length,
    totalLikes: posts.reduce((acc, post) => acc + post.likes, 0),
    categories: [...new Set(posts.map(post => post.category))]

    // totalUsers dari panjang users object dalam array  
    // activeUsers dari menyaring panjang users dengan properti active
    // totalPosts dari panjang post object dalam array 
    // totalLikes menjumalahkan semua like dari array posts dengan item post yang diproses satu persatu dan ditambahkan acc
    // category mengambil semua daftar category unik dari posts 
  };

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">Error: {error}</div>

  // jika loading tampilkan teks loading 
  // jika error tampilkan eror dengan pesan eror

  return (
    <div className="app">
      <Header
        stats={stats}
        onFilterChange={setActiveFilter}
        currentFilter={activeFilter}
      />
      <div className="dashboard">Dash</div>
    </div>
  );
}

export default App;