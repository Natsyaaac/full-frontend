# Penjelasan Alur Kode FiveLay (Fetch API -> Tampilan)

Dokumen ini versi update: ada penjelasan + potongan kode inti per blok supaya lebih jelas.

## 1. Gambaran Alur Besar

Urutan data:

1. `App.jsx` mount.
2. `App.jsx` panggil `fetchUsers()` dan `fetchPosts()`.
3. `util/api.js` request ke backend (`/api/users`, `/api/posts`).
4. `server.js` proses data lalu kirim JSON.
5. Hasil masuk ke state React (`users`, `posts`).
6. State dikirim ke `Header` dan `Dashboard` via props.
7. `Dashboard` render `UserCard` dan `PostCard`.

Arah data singkat:

`server.js -> api.js -> App.jsx (state) -> Header/Dashboard (props) -> UserCard/PostCard`

## 2. Blok Backend (`full-backend/server.js`)

### 2.1 Struktur response API
```js
const createApiResponse = (statusCode) => {
  return (data, message = 'Success') => ({
    status: statusCode,
    data,
    message,
    timestamp: new Date().toISOString()
  });
};

const successResponse = createApiResponse(200);
const errorResponse = createApiResponse(500);
```

Artinya: backend selalu kirim format yang konsisten. Frontend nanti ambil data utama dari `response.data.data`.

### 2.2 Endpoint users
```js
app.get('/api/users', async (req, res) => {
  try {
    const { filter, role } = req.query;
    let filteredUsers = [...globalData.users];

    if (filter === 'active') {
      filteredUsers = filteredUsers.filter(user => user.active);
    }

    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    res.json(successResponse(filteredUsers));
  } catch (error) {
    res.status(500).json(errorResponse(null, error.message));
  }
});
```

Artinya: backend bisa filter user sesuai query dari frontend.

### 2.3 Endpoint posts
```js
app.get('/api/posts', async (req, res) => {
  try {
    const { category, minLikes } = req.query;
    let filteredPosts = [...globalData.posts];

    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }

    if (minLikes) {
      filteredPosts = filteredPosts.filter(post => post.likes >= parseInt(minLikes));
    }

    const postsWithUser = filteredPosts.map(post => {
      const user = globalData.users.find(u => u.id === post.userId);
      return {
        ...post,
        author: user ? user.name : 'Unknown',
        isPopular: [45, 56, 78].includes(post.likes)
      };
    });

    res.json(successResponse(postsWithUser));
  } catch (error) {
    res.status(500).json(errorResponse(null, error.message));
  }
});
```

Artinya: backend menambah field `author` dan `isPopular`, jadi frontend tidak perlu hitung ulang bagian ini.

## 3. Blok API Client (`full-frontend/src/component/FiveLay/util/api.js`)

### 3.1 Konfigurasi dasar + error handler
```js
import axios from 'axios';
const API_BASE = '/api';

const handleApiError = (error) => {
  if (error.response) {
    throw new Error('Terjadi kesalahan dari server');
  } else if (error.request) {
    throw new Error('Tidak dapat terhubung ke server');
  } else {
    throw new Error('Gagal memuat data');
  }
};
```

Artinya: kalau request gagal, pesan error dibuat lebih manusiawi.

### 3.2 Function fetch
```js
export const fetchUsers = async (filter = '', role = '') => {
  try {
    const params = new URLSearchParams();
    if (filter) params.append('filter', filter);
    if (role) params.append('role', role);

    const response = await axios.get(`${API_BASE}/users?${params}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchPosts = async (category = '', minLikes = 0) => {
  try {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (minLikes) params.append('minLikes', minLikes);

    const response = await axios.get(`${API_BASE}/posts?${params}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
```

Artinya: file ini jadi jembatan antara komponen React dan backend API.

## 4. Blok Utama React (`full-frontend/src/component/FiveLay/App.jsx`)

### 4.1 State utama
```js
const [users, setUsers] = useState([]);
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [activeFilter, setActiveFilter] = useState('all');
```

Artinya: semua data inti aplikasi disimpan di `App`.

### 4.2 Ambil data saat komponen pertama kali tampil
```js
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const [usersData, postsData] = await Promise.all([
        fetchUsers(),
        fetchPosts()
      ]);

      setUsers(usersData);
      setPosts(postsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, []);
```

Artinya:
- request users + posts jalan bareng (lebih cepat),
- hasil disimpan ke state,
- lalu UI otomatis re-render.

### 4.3 Filter user + kirim data ke child
```js
const getFilteredUsers = () => {
  switch (activeFilter) {
    case 'active':
      return users.filter(user => user.active);
    case 'inactive':
      return users.filter(user => !user.active);
    default:
      return users;
  }
};

return (
  <div className="app">
    <Header
      stats={stats}
      onFilterChange={setActiveFilter}
      currentFilter={activeFilter}
    />
    <Dashboard users={getFilteredUsers()} posts={posts} />
  </div>
);
```

Artinya: `App` adalah pusat data, child hanya menerima data lewat props.

## 5. Blok Header (`components/Header.jsx`)

```js
const Header = ({ stats, onFilterChange, currentFilter }) => {
  return (
    <div className="filter-buttons">
      {['all', 'active', 'inactive'].map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
```

Artinya: saat tombol diklik, Header mengirim aksi ke `App` (`setActiveFilter`).

## 6. Blok Dashboard (`components/Dashboard.jsx`)

### 6.1 State lokal filter post
```js
const [selectedCategory, setSelectedCategory] = useState('all');
const [searchTerm, setSearchTerm] = useState('');
```

### 6.2 Filter post berdasarkan kategori + search
```js
const getFilteredPosts = () => {
  let filtered = [...posts];

  if (selectedCategory !== 'all') {
    filtered = filtered.filter(post => post.category === selectedCategory);
  }

  if (searchTerm) {
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return filtered;
};

const filteredPosts = getFilteredPosts();
```

### 6.3 Render list card
```js
<div className="users-grid">
  {users.map(user => (
    <UserCard key={user.id} user={user} />
  ))}
</div>

<div className="posts-grid">
  {filteredPosts.map(post => (
    <PostCard key={post.id} post={post} />
  ))}
</div>
```

Artinya: data array diubah jadi komponen UI lewat `.map()`.

## 7. Blok Kartu UI

### 7.1 `UserCard.jsx`
```js
const UserCard = ({ user }) => {
  const { name, email, role, active } = user;

  return (
    <div className={`user-card ${active ? 'active' : 'inactive'}`}>
      <h3>{name}</h3>
      <p>{email}</p>
      <span>{role}</span>
    </div>
  );
};
```

### 7.2 `PostCard.jsx`
```js
const PostCard = ({ post }) => {
  const { title, author, likes, isPopular } = post;

  return (
    <article className={`post-card ${isPopular ? 'popular' : ''}`}>
      <h3>{title}</h3>
      <span>By {author}</span>
      <span>{likes} likes</span>
    </article>
  );
};
```

Artinya: komponen card fokus menampilkan data, bukan ambil data.

## 8. Alur Data Step-by-Step (Paling Praktis)

1. Halaman dibuka -> `App` mount.
2. `useEffect` di `App` jalan -> panggil `fetchUsers` + `fetchPosts`.
3. `api.js` request ke endpoint backend.
4. `server.js` olah data lalu kirim response.
5. `App` simpan response ke state.
6. `App` kirim data ke `Header` dan `Dashboard` via props.
7. `Dashboard` filter/search data post.
8. `.map()` merender `UserCard` dan `PostCard`.
9. Data tampil di layar.

Selesai: aliran data tetap satu arah, jadi debugging lebih mudah.
