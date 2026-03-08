import api from "./apiClient";

export const bidOnJob = async (jobId, bidData) => {
    try {
        const response = await api.post(`/jobs/${jobId}/bids`, bidData);
        return response.data;
    }catch (error) {
        console.error('Error placing bid:', error);
        if (error.response) {
            console.error('Error placing bid:', error.response.data.message);
        }
        throw error;
    }
}

export const getBidsForJob = async (jobId) => {
    try{
        const response = await api.get(`/jobs/${jobId}/bids`);
        return response.data;
    }catch (error) {
        console.error('Error fetching bids for job:', error);
        if (error.response) {
            console.error('Error fetching bids for job:', error.response.data.message);
        }
        throw error;
    }
}