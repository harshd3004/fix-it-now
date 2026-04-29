import AdminStatCard from './AdminStatCard';

function AdminDashboard({ stats, loading, error, onRetry }) {
  const cards = [
    { key: 'totalUsers', label: 'Total Users', color: 'blue' },
    { key: 'totalTechnicians', label: 'Total Technicians', color: 'violet' },
    { key: 'totalJobs', label: 'Total Jobs', color: 'amber' },
    { key: 'activeJobs', label: 'Active Jobs', color: 'emerald' },
    { key: 'completedJobs', label: 'Completed Jobs', color: 'blue' },
    {
      key: 'pendingTechnicianVerifications',
      label: 'Pending Technician Verifications',
      color: 'rose'
    }
  ];

  return (
    <section className='flex-1 space-y-6'>
      <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h1 className='text-3xl font-bold text-gray-900'>Dashboard</h1>
        <p className='mt-2 text-gray-600'>Quick overview of platform activity</p>
      </div>

      {loading && (
        <div className='rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700'>
          Loading dashboard metrics...
        </div>
      )}

      {error && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          <p>{error}</p>
          <button
            type='button'
            onClick={onRetry}
            className='mt-3 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-red-700'
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          {cards.map((card) => (
            <AdminStatCard
              key={card.key}
              label={card.label}
              value={stats?.[card.key] ?? 0}
              color={card.color}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminDashboard;
