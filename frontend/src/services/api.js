import axios from 'axios'

// Get backend URL from environment
const baseURL = import.meta.env.VITE_API_BASE_URL 


const api = axios.create({
  baseURL
})

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = token
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api
