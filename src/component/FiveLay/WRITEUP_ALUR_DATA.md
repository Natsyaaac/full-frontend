# Penjelasan Alur Kode FiveLay (Fetch API -> Tampilan)

Dokumen ini menjelaskan alur data di project FiveLay, dari backend API sampai tampil di UI React.

## 1. Gambaran Alur Besar

Alur utamanya seperti ini:

1. `App.jsx` dijalankan saat halaman dibuka.
2. `useEffect` memanggil `fetchUsers()` dan `fetchPosts()` dari `util/api.js`.
3. `util/api.js` mengirim request ke endpoint backend (`/api/users` dan `/api/posts`).
4. `server.js` mengambil data, memfilter/menambah field, lalu kirim JSON response.
5. Hasil response masuk ke state React (`users`, `posts`) di `App.jsx`.
6. State dikirim ke `Header` dan `Dashboard` lewat props.
7. `Dashboard` memetakan data menjadi `UserCard` dan `PostCard` lalu tampil ke layar.

Ringkas arah data:

`Backend (server.js) -> util/api.js -> App.jsx (state) -> Header/Dashboard (props) -> UserCard/PostCard (UI)`

## 2. Blok Backend: `full-backend/server.js`

### a) Sumber data
- Data user dan post disimpan di `globalData` (sementara di memory).

### b) Bentuk response
- Semua endpoint memakai format:
  - `status`
  - `data`
  - `message`
  - `timestamp`

### c) Endpoint `/api/users`
- Bisa terima query `filter=active` dan `role=...`.
- Server memfilter array users sesuai query.
- Hasil dikirim ke frontend lewat `res.json(...)`.

### d) Endpoint `/api/posts`
- Bisa terima query `category` dan `minLikes`.
- Server memfilter posts sesuai query.
- Lalu server menambah field:
  - `author` (nama user dari `userId`)
  - `isPopular` (penanda populer berdasarkan likes tertentu)
- Hasil akhir dikirim ke frontend.

Intinya: backend menyiapkan data mentah + data turunan supaya frontend tinggal render.

## 3. Blok API Client: `full-frontend/src/component/FiveLay/util/api.js`

### a) `API_BASE = '/api'`
- Semua request axios memakai prefix ini.

### b) `fetchUsers(filter, role)`
- Susun query dengan `URLSearchParams`.
- `axios.get('/api/users?...')`.
- Return `response.data.data` (yang dipakai React).

### c) `fetchPosts(category, minLikes)`
- Polanya sama, request ke `/api/posts`.
- Return `response.data.data`.

### d) `handleApiError(error)`
- Ubah error axios jadi pesan yang lebih mudah dibaca.
- Error ini dilempar ke pemanggil (`App.jsx`).

Intinya: file ini jadi jembatan antara React dan backend.

## 4. Blok Utama React: `full-frontend/src/component/FiveLay/App.jsx`

### a) State utama
- `users`: simpan data user dari API.
- `posts`: simpan data post dari API.
- `loading`: status proses ambil data.
- `error`: simpan pesan error jika gagal.
- `activeFilter`: filter user (`all/active/inactive`).

### b) `useEffect` (jalan sekali saat mount)
- Fungsi `loadData()` dipanggil.
- `Promise.all([fetchUsers(), fetchPosts()])` jalan paralel.
- Jika sukses:
  - `setUsers(usersData)`
  - `setPosts(postsData)`
  - `setError(null)`
- Jika gagal:
  - `setError(err.message)`
- Terakhir selalu:
  - `setLoading(false)`

### c) Filter user di `getFilteredUsers()`
- Jika `activeFilter = active`, ambil user aktif.
- Jika `inactive`, ambil user nonaktif.
- Jika `all`, kembalikan semua users.

### d) Statistik `stats`
- Hitung total user, user aktif, total post, total likes, dan kategori unik.
- `stats` ini dikirim ke `Header`.

### e) Render
- Saat `loading`: tampil `Loading...`.
- Saat `error`: tampil pesan error.
- Saat data siap:
  - `Header` menerima `stats`, `onFilterChange`, `currentFilter`.
  - `Dashboard` menerima `users` hasil filter dan `posts`.

Intinya: `App.jsx` adalah pusat state dan pusat alur data.

## 5. Blok Header: `full-frontend/src/component/FiveLay/components/Header.jsx`

### a) Terima props dari App
- `stats`
- `onFilterChange`
- `currentFilter`

### b) Tampilkan statistik
- `Object.entries(stats)` diubah jadi list kartu statistik.

### c) Tombol filter user
- Tombol `all/active/inactive` memanggil `onFilterChange(filter)`.
- Ini mengubah state `activeFilter` di `App.jsx`.
- Setelah state berubah, `App.jsx` render ulang dan kirim user yang sudah difilter ke `Dashboard`.

Intinya: Header tidak ambil data sendiri, hanya tampilkan dan kirim aksi ke App.

## 6. Blok Dashboard: `full-frontend/src/component/FiveLay/components/Dashboard.jsx`

### a) Terima props
- `users` (sudah difilter dari App)
- `posts` (semua post dari App)

### b) State lokal Dashboard
- `selectedCategory` untuk filter kategori post.
- `searchTerm` untuk cari post berdasar judul/author.

### c) `getFilteredPosts()`
- Mulai dari copy `posts`.
- Jika kategori bukan `all`, filter by `post.category`.
- Jika `searchTerm` ada, filter by `title` atau `author` (case-insensitive).
- Return hasil akhir `filteredPosts`.

### d) Render komponen kecil
- `users.map(...)` -> `UserCard`.
- `filteredPosts.map(...)` -> `PostCard`.
- Jika `filteredPosts` kosong, tampil pesan no result.

Intinya: Dashboard mengatur logika tampilan daftar dan pencarian post.

## 7. Blok Kartu UI

### a) `UserCard.jsx`
- Menerima 1 object `user`.
- Menampilkan nama, email, role, status active/offline.
- Class CSS berubah sesuai status user.

### b) `PostCard.jsx`
- Menerima 1 object `post`.
- Menampilkan kategori, judul, author, likes.
- Jika `isPopular = true`, tampil badge popular.

Intinya: kedua komponen ini fokus presentasi (display), bukan ambil data.

## 8. Alur Data Pergerakan (Step-by-step)

1. Browser buka halaman -> `App.jsx` mount.
2. `App.jsx` panggil `fetchUsers` + `fetchPosts`.
3. `api.js` kirim request ke backend.
4. `server.js` proses data dan kirim response JSON.
5. `api.js` ambil `response.data.data` dan return.
6. `App.jsx` simpan ke state (`users`, `posts`).
7. `App.jsx` kirim data ke `Header` dan `Dashboard`.
8. `Dashboard` filter/search posts, lalu map ke card.
9. `UserCard` dan `PostCard` render ke tampilan.

Selesai: data bergerak satu arah dari API -> state -> props -> komponen UI.
