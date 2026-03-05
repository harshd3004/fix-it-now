import api from "./apiClient";

export const bidOnJob = async (bidData) => {
    try {
        const response = await api.post('/bids', bidData);
        return response.data;
    }catch (error) {
        console.error('Error placing bid:', error);
        if (error.response) {
            console.error('Error placing bid:', error.response.data.message);
        }
        throw error;
    }
}