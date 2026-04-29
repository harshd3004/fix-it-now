function AdminStatCard({ label, value, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    amber: 'bg-amber-50 border-amber-100 text-amber-700',
    rose: 'bg-rose-50 border-rose-100 text-rose-700',
    violet: 'bg-violet-50 border-violet-100 text-violet-700',
    gray: 'bg-gray-50 border-gray-200 text-gray-700'
  };

  return (
    <article className={`rounded-xl border p-5 ${colorClasses[color] || colorClasses.gray}`}>
      <p className='text-sm font-medium'>{label}</p>
      <p className='mt-2 text-3xl font-bold'>{value}</p>
    </article>
  );
}

export default AdminStatCard;
