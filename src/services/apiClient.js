import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://backend-production-7e1d.up.railway.app/api',
  withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient