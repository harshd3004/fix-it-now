import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import NotificationDropdown from './NotificationDropdown'

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className='sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm'>
      <div className='container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4'>
        <NavLink to='/' className='text-xl font-bold tracking-tight text-blue-600'>
          Fix It Now
        </NavLink>

        {user ? (
          <div className='flex items-center gap-3 sm:gap-5'>
            <NavLink
              to='/post-job'
              className='hidden sm:inline-flex text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'
            >
              Post Job
            </NavLink>

            <NotificationDropdown />

            <NavLink
              to='/profile'
              className='hidden sm:inline-flex text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'
            >
              Profile
            </NavLink>
            <button
              onClick={handleLogout}
              className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-3 sm:gap-4'>
            <NavLink to='/register-technician' className='hidden md:inline-flex text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>
              Register as Technician
            </NavLink>
            <NavLink to='/login' className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>
              Sign In
            </NavLink>
            <NavLink
              to='/register'
              className='px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-sm transition-colors duration-200 hover:bg-blue-700'
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar