import api from './apiClient';

export const postJob = async (jobData) => {
    try {
        const response = await api.post('/jobs', jobData);
        return response.data;
    } catch (error) {
        console.error('Error posting job:', error);
        if (error.response) {
            console.error('Error posting job:', error.response.data.message);
        }
        throw error;
    }
}