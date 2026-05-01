import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAdminDashboardStats } from '../api/adminApi';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import TechnicianVerification from '../components/admin/TechnicianVerification';

function AdminPanel() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getAdminDashboardStats();
      setStats(response);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch admin dashboard stats.');
      setStats(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'admin') {
      navigate('/');
      return;
    }

    if (activeSection === 'dashboard') {
      fetchDashboardStats();
    }
  }, [fetchDashboardStats, navigate, user, activeSection]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <main className='container mx-auto px-4 py-8 sm:px-6 lg:px-8'>
      <div className='flex flex-col gap-6 lg:flex-row'>
        <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        {activeSection === 'dashboard' && (
          <AdminDashboard
            stats={stats}
            loading={loading}
            error={error}
            onRetry={fetchDashboardStats}
          />
        )}

        {activeSection === 'technician-verification' && <TechnicianVerification />}
      </div>
    </main>
  );
}

export default AdminPanel;
