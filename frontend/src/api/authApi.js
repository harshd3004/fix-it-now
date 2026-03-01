import api from './apiClient'

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData)
        return response.data
    } catch (error) {
        console.error('Registration error:', error)
        if (error.response) {
            console.error('Registration error:', error.response.data.message)
        }
        throw error
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials)
        return response.data
    }catch (error) {
        console.error('Login error:', error)
        if (error.response) {
            console.error('Login error:', error.response.data.message)
        }
        throw error
    }
}