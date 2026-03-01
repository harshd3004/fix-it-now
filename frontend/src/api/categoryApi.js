import api from './apiClient'

export const getCategoriesList = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        if (error.response) {
            console.error('Error fetching categories:', error.response.data.message);
        }
        throw error;
    }
}