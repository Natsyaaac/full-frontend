import React, { useState, useEffect, useCallback } from 'react';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    // funsi async yang mengembalikan Promise untuk mengambil data tasks
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/tasks');
      //mengaktifkan laoding lalu menunggu Promise dari fetch resolve (none-blocking)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
        // jika status http bukan (200, 299), lempar error agar promise reject dan masuk catch 
      }

      const result = await response.json();
      // menunggu Promise parsing JSON lalu menyimpan hasil object ke result 

      if (result.success) {
        setTasks(result.data);
        setError(null)
        // jika success true, update state dan reset error
      } else {
        throw new Error(result.error)
        // jika success false, lempar error agar ditangani oleh catch dan menghentikan eksekusi 
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err)
      // mengkap semua error dari try (promise reject atau throw) lalu menyimpan pesan error 
    } finally {
      setLoading(false);
      // blok finnaly sellau dijalankan menonaktifkan laading  
    }
  };

  useEffect(() => {
    fetchTasks();
    // useEffect dijalankan sekali saat moount(dependency kosong) dan memanggil fetchtasks
  }, []);

  const groupTasksByStatus = useCallback(() => {
    // function memoized yang mengelompokkan tasks berdasarkan status  (closure terhadap tsaks)

    return tasks.reduce((acc, task) => {
      // menmapung hasil sementara, nilai awal acc adalah object dengan 3 array kosng 
      const { status, ...taskWithoutStatus } = task;
      // destructing untuk mengambil status, dan rest operator untuk membuar object baru tanpa properti status 

      if (!acc[status]) {
        acc[status] = []
        // jika key status belum ada di acc, membuat array kosong dulu 
      }

      acc[status] = [...acc[status], taskWithoutStatus];
      return acc
      // membuat array baru dengan spread lalu menambahkann taskWithoutStatus (shallow copy )
    }, { todo: [], doing: [], done: [] });
    // nilai awal accumulator berupa object dengan tiga kategori statsu 
  }, [tasks])
  // dependency tasks, fungcition dibuat ulang saat takks brubah 

  const handleCreateTask = async (taskData) => {
    // function async untuk membuat tasks baru (mengembalikan PRomise)
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
        // mengirim request POST dan menunggu promise resolvve, body dikirim dalam format JSON string 
      });

      const result = await response.json()
      // menunggu promise parsing json lalu menyimpan object hasilnya

      if (result.success) {
        setTasks(prevTasks => [...prevTasks, result.data]);
        setShowForm(false);
        // Menggunakan functional update untuk membuat array baru dari prevTasks lalu menambahkan data baru
      } else {
        throw new Error(result.error)
        // jika gagal false, lempar error agar ditangan catch dan menghentikan eksekusi 
      }
    } catch (err) {
      alert('Gagal; membuar task: ' + err.message)
      // menangkap Promise rejection atau throw llau menampilkan pesann error 
    }
  };


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

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = await new Promise((resolve) => {
      const result = window.confirm('Yakin ingin mengapus task ini');
      resolve(result)
    });
  }
  return (
    <div className="app">
      Header
    </div>
  )
}

export default App