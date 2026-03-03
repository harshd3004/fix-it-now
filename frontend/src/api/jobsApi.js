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