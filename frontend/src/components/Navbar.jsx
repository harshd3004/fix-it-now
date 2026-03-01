import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Navbar() {
  const {user, logout} = useAuth();

  const handleLogout = () => {
    logout();
  }
  return (
    <nav className='bg-white border-b border-gray-200 shadow-sm py-4 px-8 sticky top-0 z-50'>
      <div className='container mx-auto flex items-center justify-between'>
        <NavLink to='/' className='text-xl font-bold text-blue-600'>Fix It Now</NavLink>
        {user ? (
          <div className='flex items-center gap-6'>
            <NavLink to='#' className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>Profile</NavLink>
            <button onClick={handleLogout} className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>Logout</button>
          </div>
        ) : (
          <div className='flex items-center gap-4'>
            <NavLink to='/register-technician' className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>Register as Technician</NavLink>
            <NavLink to='/login' className='text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200'>Sign In</NavLink>
            <NavLink to='/register' className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium'>Register</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar