import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

//attach jwt to requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
    (error) => {
        return Promise.reject(error);
});

//handle 401 errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Session expired or unauthorized. Logging out...');

            // Clear user data and token from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default api