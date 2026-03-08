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

export const acceptBid = async (bidId) => {
    try {
        const response = await api.post(`/bids/${bidId}/accept`);
        return response.data;
    }catch (error) {
        console.error('Error accepting bid:', error);
        if (error.response) {
            console.error('Error accepting bid:', error.response.data.message);
        }
        throw error;
    }
}

export const rejectBid = async (bidId) => {
    try {
        const response = await api.post(`/bids/${bidId}/reject`);
        return response.data;
    }catch (error) {
        console.error('Error rejecting bid:', error);
        if (error.response) {
            console.error('Error rejecting bid:', error.response.data.message);
        }
        throw error;
    }
}