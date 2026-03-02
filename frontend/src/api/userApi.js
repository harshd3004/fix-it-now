import api from './apiClient'

export const getUserProfile = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}`)
        return response.data
    } catch (error) {
        console.error('Error fetching user profile:', error)
        if (error.response) {
            console.error('Error fetching user profile:', error.response.data.message)
        }
        throw error
    }
}