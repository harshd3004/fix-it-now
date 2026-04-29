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
