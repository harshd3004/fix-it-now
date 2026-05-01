import api from './apiClient';

export const getAdminDashboardStats = async () => {
    try {
        const response = await api.get('/admin/dashboard-stats');
        return response.data;
    } catch (error) {
        console.error('Error fetching admin dashboard stats:', error);
        if (error.response) {
            console.error('Error fetching admin dashboard stats:', error.response.data.message);
        }
        throw error;
    }
};

export const getPendingTechnicians = async () => {
    try {
        const response = await api.get('/admin/pending-technicians');
        return response.data;
    } catch (error) {
        console.error('Error fetching pending technicians:', error);
        if (error.response) {
            console.error('Error fetching pending technicians:', error.response.data.message);
        }
        throw error;
    }
};

export const approveTechnicianVerification = async (technicianId) => {
    try {
        const response = await api.post(`/admin/technicians/${technicianId}/approve`);
        return response.data;
    } catch (error) {
        console.error('Error approving technician:', error);
        if (error.response) {
            console.error('Error approving technician:', error.response.data.message);
        }
        throw error;
    }
};

export const rejectTechnicianVerification = async (technicianId) => {
    try {
        const response = await api.post(`/admin/technicians/${technicianId}/reject`);
        return response.data;
    } catch (error) {
        console.error('Error rejecting technician:', error);
        if (error.response) {
            console.error('Error rejecting technician:', error.response.data.message);
        }
        throw error;
    }
};
