import axios from "axios";
const API_BASE = '/api';

const handleApiError = (error) => {
  // function untuk memproses dan melempar error berdasarkan struktur object error
  const getErrorMessage = (status) => {
    // unction inner (closure) yang mengakses scope luar dan mengembalikan pesan berdasarkan status code
    const message = {
      404: 'Data tidak ditemukan',
      505: 'Kesalahan server',
      default: 'Terjadi kesalahan'
      // object literal sebagai mapping antara statuc code dan pesan error 
    };
    return message[status] || message.default;
    // mengembalikan pesan sesuai status, atau default jika tidak ditemukan 
  };

  if (error.response) {
    // jika server meresnpons dengan status error (response ada)
    throw new Error(getErrorMessage(error.response.status));
    // melempar instance error baru dengan pesan berdasarkan status code, menghentikan eksekusi dan meneruskan error pemanggil 
  } else if (error.request) {
    throw new Error('Tidak dapat terhubung ke server');
    // jika request terkirim tetapi tidak ada response dari server
  } else {
    throw new Error('Gagal memuat data')
    // jika error terjadi sebelum request dikirim atau kesalahan konfigurasi
  }
};


export const fetchUsers = async (filter = '', role = '') => {
  // function async yang mengembalikan Promise dan digunakan untuk mengambil data users dari API
  try {
    const params = new URLSearchParams();
    // membuat instance URLSerachParamas untuk membangun query string secara dinamis
    if (filter) params.append('filter', filter);
    if (role) params.append('role', role);

    // menambahkan parameter filter jika bernilai truthy
    // menambahkan parameter role jika bernilai truthy

    const response = await axios.get(`${API_BASE}/users?${params}`)
    // menunggu Promise dari axios.get resolve dan menyimpan hasil response

    return response.data.data;
    // mengembalikan data hasil response ke pemanggil function 
  } catch (error) {
    handleApiError(error)
    // menanggkap error dari axios.get lalu meneruskanya melalui handleApiError
  }
};

export const fetchUserById = async (id) => {
  // function async yang mengenbalikan promise dan digunakan untuk mengambil data users dengan id dari api
  try {
    const response = await axios.get(`${API_BASE}/users/${id}`);
    // menunggu Promise dari axios.get resolve dan menyimpan hasil response
    return response.data.data;
    // mengembalikan data hasil response ke pemanggil function 
  } catch (error) {
    handleApiError(error)
    // menanngkap error dari axios.get lalu meneruskanya melalui handleApiError
  }
};

export const fetchPosts = async (category = '', minLikes = 0) => {
  // \functions async yang mengembalikan Promise untuk mengambil data post berdasarkan parameter category dan minLikes
  try {
    const params = new URLSearchParams();
    // membuat instance URLSerachParamas untuk membangun query string secara dinamis

    if (category) params.append('category', category);
    if (minLikes) params.append('minLikes', minLikes);
    // menambahkan parameter category jika bernilai truthy
    // menambahkan parameter minLikes jika bernilai truthy

    const response = await axios.get(`${API_BASE}/posts?${params}`);
    // menunggu Promise dari axios.get resolve dan menyimpan hasil response
    return response.data.data
    // mengembalikan data hasil response ke pemanggil function 
  } catch (error) {
    handleApiError(error)
    // menangkap error dari axios.get lalu meneruskanya melalui handleApiError
  }
}
