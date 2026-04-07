import api from './apiClient'

export const getNotifications = async () => {
    try {
        const response = await api.get('/notifications');
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        if (error.response) {
            console.error('Error fetching notifications:', error.response.data.message);
        }
        throw error;
    }
}

export const markAsRead = async (notificationId) => {
    try {
        const response = await api.patch(`/notifications/${notificationId}/mark-read`);
        return response.data;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        if (error.response) {
            console.error('Error marking notification as read:', error.response.data.message);
        }
        throw error;
    }
}