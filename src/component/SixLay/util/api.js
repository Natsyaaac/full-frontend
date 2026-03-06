import axios from "axios";
const API_BASE = '/api';

const handleApiError = (error) => {
  const getErrorMessage = (status) => {
    const message = {
      404: 'Data tidak ditemukan',
      505: 'Kesalahan server',
      default: 'Terjadi kesalahan'
    };
    return message[status] || message.default;
  };

  if (error.response) {
    throw new Error(getErrorMessage(error.response.status))
  } else if (error.request) {
    throw new Error('Tidak dapat terhuubung ke server');
  } else {
    throw new Error('Gaga; memuat data')
  }
};


export const fetchUsers = async (filter = '', role = '') => {
  try {
    const params = new URLSearchParams();

    if (filter) params.append('filter', filter);
    if (role) params.append('role', role);

    const response = await axios.get(`${API_BASE}/users?${params}`)
    return response.data.data;
  } catch (error) {
    handleApiError(error)
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/users/${id}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error)
  }
};


export const fetchPostBug = async (category = '', minLikes = 0) => {
  try {
    const params = new URLSearchParams();

    if (category) params.append('category', category);
    if (minLikes) params.append('minLikes', minLikes);

    const response = await axios.get(`${API_BASE}/bugs?${params}`);
    return response.data.data;
  } catch (error) {
    handleApiError(error)
  }
}