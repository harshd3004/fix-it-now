import api from './apiClient';

const buildQueryParams = (filters) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
        const value = filters[key];

        if (value === undefined || value === null) return;
        
        if (Array.isArray(value)) {
            if (value.length === 0) return;
            value.forEach(v => params.append(key, v));
        } else {
            params.append(key, value);
        }

    })
    return params;
}

export const postJob = async (jobData) => {
    try {
        const response = await api.post('/jobs', jobData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting job:', error);
        if (error.response) {
            console.error('Error posting job:', error.response.data.message);
        }
        throw error;
    }
}

export const getJobs = async (filters) => {
    try {
        const params = buildQueryParams(filters);
        const response = await api.get('/jobs', {params});
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        if (error.response) {
            console.error('Error fetching jobs:', error.response.data.message);
        }
        throw error;
    }
}

export const getJobById = async (jobId) => {
    try {
        const response = await api.get(`/jobs/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        if (error.response) {
            console.error('Error fetching job by ID:', error.response.data.message);
        }
        throw error;
    }
}

//job status related APIs----------
export const updateJobStatus = async (jobId, oldStatus, newStatus) => {
    try {
        const response = await api.post(`/jobs/${jobId}/update-status`, { fromStatus: oldStatus, toStatus: newStatus });
        return response.data;
    } catch (error) {
        console.error('Error updating job status:', error);
        if (error.response) {
            console.error('Error updating job status:', error.response.data.message);
        }
        throw error;
    }
}

export const getStatusRequest = async (jobId) => {
    try {
        const response = await api.get(`/jobs/${jobId}/status-request`);
        return response.data;
    } catch (error) {
        console.error('Error fetching status request:', error);
        if (error.response) {
            console.error('Error fetching status request:', error.response.data.message);
        }
        throw error;
    }
}

export const approveStatusRequest = async (requestId) => {
    try {
        const response = await api.post(`/status-requests/${requestId}/approve`);
        return response.data;
    } catch (error) {
        console.error('Error approving status request:', error);
        if (error.response) {
            console.error('Error approving status request:', error.response.data.message);
        }
        throw error;
    }
}

export const rejectStatusRequest = async (requestId) => {
    try {
        const response = await api.post(`/status-requests/${requestId}/reject`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting status request:', error);
        if (error.response) {
            console.error('Error rejecting status request:', error.response.data.message);
        }
        throw error;
    }
}