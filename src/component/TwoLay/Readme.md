# Penjelasan `App.jsx` (Sebelum `return`)

Dokumen ini menjelaskan alur kerja kode di `full-frontend/src/component/TwoLay/App.jsx`, khususnya bagian **sebelum `return`**.

## Ilustrasi Skematik

```text
App Mount
   |
   v
Inisialisasi state:
tasks | loading | error | showForm
   |
   v
useEffect([]) -> fetchTasks()
   |
   +--> setLoading(true)
   +--> GET /api/tasks
   +--> cek response.ok
   +--> response.json()
   +--> result.success ?
          | yes -> setTasks(result.data), setError(null)
          | no  -> throw Error(result.error)
   +--> catch -> setError(...)
   +--> finally -> setLoading(false)
   |
   v
groupTasksByStatus() (useCallback + reduce)
   |
   v
groupedTasks = { todo: [], doing: [], done: [] } + isi task
   |
   v
Event handler user:
  - handleCreateTask() -> POST -> tambah task ke state
  - handleUpdateTaskStatus() -> PUT -> update status via map
  - handleDeleteTask() -> confirm -> DELETE -> hapus via filter
   |
   v
if (loading) tampilkan <LoadingSpinner />
```

## Penjelasan Per Blok Kode

### 1) Import Dependensi

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import './App.css'
import LoadingSpinner from '../../tes/LoadingSpinner';
```

- `useState` untuk state lokal komponen.
- `useEffect` untuk efek samping saat komponen mount.
- `useCallback` untuk memoize fungsi `groupTasksByStatus`.
- `LoadingSpinner` dipakai untuk kondisi loading.

### 2) State Utama

```jsx
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [showForm, setShowForm] = useState(false);
```

- `tasks`: daftar task dari backend.
- `loading`: status proses request data.
- `error`: menyimpan pesan error jika request gagal.
- `showForm`: kontrol tampil/sembunyi form (sudah disiapkan).

### 3) `fetchTasks` (Ambil Data Awal)

```jsx
const fetchTasks = async () => {
  try {
    setLoading(true);
    const response = await fetch('http://localhost:5000/api/tasks');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json();

    if (result.success) {
      setTasks(result.data);
      setError(null)
    } else {
      throw new Error(result.error)
    }
  } catch (err) {
    setError(err.message);
    console.error('Error fetching tasks:', err)
  } finally {
    setLoading(false);
  }
};
```

Cara kerja:
- Mengaktifkan loading.
- Request `GET /api/tasks`.
- Validasi status HTTP (`response.ok`).
- Parse JSON.
- Jika `result.success === true`, data masuk ke `tasks`.
- Jika gagal, lempar error ke `catch`.
- `finally` selalu jalan untuk mematikan loading.

### 4) `useEffect` Saat Mount

```jsx
useEffect(() => {
  fetchTasks();
}, []);
```

- Dependency array kosong `[]` berarti berjalan sekali saat komponen pertama kali render (mount).
- Tujuannya: load data task awal dari backend.

### 5) `groupTasksByStatus` (Pengelompokan Data)

```jsx
const groupTasksByStatus = useCallback(() => {
  return tasks.reduce((acc, task) => {
    const { status, ...taskWithoutStatus } = task;

    if (!acc[status]) {
      acc[status] = []
    }

    acc[status] = [...acc[status], taskWithoutStatus];
    return acc
  }, { todo: [], doing: [], done: [] });
}, [tasks])
```

Cara kerja:
- Fungsi ini dibungkus `useCallback`, jadi identitas fungsi stabil dan dibuat ulang hanya saat `tasks` berubah.
- `reduce` mengelompokkan task berdasarkan `status`.
- Nilai awal accumulator sudah berisi tiga kolom: `todo`, `doing`, `done`.
- Setiap task dimasukkan ke array status yang sesuai.

### 6) `handleCreateTask` (Tambah Task)

```jsx
const handleCreateTask = async (taskData) => {
  try {
    const response = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData)
    });

    const result = await response.json()

    if (result.success) {
      setTasks(prevTasks => [...prevTasks, result.data]);
      setShowForm(false);
    } else {
      throw new Error(result.error)
    }
  } catch (err) {
    alert('Gagal; membuar task: ' + err.message)
  }
};
```

Cara kerja:
- Kirim data task baru ke backend (`POST`).
- Jika sukses, task baru ditambahkan ke state dengan functional update.
- Form ditutup (`setShowForm(false)`).
- Jika gagal, tampilkan alert error.

### 7) `handleUpdateTaskStatus` (Ubah Status)

```jsx
const handleUpdateTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus })
    });

    const result = await response.json();

    if (result.success) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId
            ? { ...task, status: newStatus }
            : task
        )
      );
    } else {
      throw new Error(result.error); 
    }
  } catch (err) {
    alert('Gagal update status: ' + err.message) 
  }
};
```

Cara kerja:
- Kirim request `PUT` untuk update status task tertentu.
- Jika sukses, state `tasks` diubah immutably via `map`.
- Hanya task dengan `id` cocok yang di-update.

### 8) `handleDeleteTask` (Hapus Task)

```jsx
const handleDeleteTask = async (taskId) => {
  const confirmDelete = await new Promise((resolve) => {
    const result = window.confirm('Yakin ingin mengapus task ini');
    resolve(result)
  });

  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'DELETE',
    });

    const result = await response.json()

    if (result.success) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } else {
      throw new Error(result.error)
    }
  } catch (err) {
    alert('Gagal menghapus task: ' + err.message)
  }
};
```

Cara kerja:
- Minta konfirmasi user dulu (`window.confirm`).
- Jika batal, fungsi berhenti.
- Jika lanjut, kirim `DELETE` ke backend.
- Jika sukses, hapus task dari state via `filter`.

### 9) Hitung Data Group Sebelum Render

```jsx
const groupedTasks = groupTasksByStatus();
```

- Fungsi grouping dipanggil untuk menghasilkan data siap pakai per kolom status.
- Variabel ini disiapkan sebelum proses render utama.

### 10) Guard Loading Sebelum `return` Utama

```jsx
if (loading) return <LoadingSpinner />
```

- Selama `loading === true`, komponen langsung return spinner.
- Ini mencegah UI utama ditampilkan saat data belum siap.
