function AdminSidebar() {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'user-management', label: 'User Management', active: false },
    { id: 'technician-verification', label: 'Technician Verification System', active: false },
    { id: 'category-management', label: 'Category Management', active: false }
  ];

  return (
    <aside className='w-full lg:w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-sm'>
      <div className='mb-5 border-b border-gray-100 pb-4'>
        <h2 className='text-lg font-bold text-gray-900'>Admin Panel</h2>
        <p className='mt-1 text-sm text-gray-600'>Manage platform operations</p>
      </div>

      <nav className='space-y-2'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            type='button'
            disabled={!item.active}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200 ${
              item.active
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            }`}
          >
            {item.label}
            {!item.active && <span className='ml-2 text-xs opacity-80'>(Coming soon)</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
