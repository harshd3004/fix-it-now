import {} from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function Navbar() {
  const {user, logout} = useAuth();

  const handleLogout = () => {
    logout();
  }
  return (
    <nav className='bg-gray-800 text-white py-4 px-8'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='text-lg font-bold'>Fix It Now</div>
        {user ? (
          <div>
            <NavLink to='#' className='px-3 py-2 hover:bg-gray-700 rounded'>Profile</NavLink>
            <NavLink onClick={handleLogout} className='px-3 py-2 hover:bg-gray-700 rounded'>Logout</NavLink>
          </div>
        ) : (
          <div>
            <NavLink to='#' className='px-3 py-2 hover:bg-gray-700 rounded'>Register as Technician</NavLink>
            <NavLink to='/login' className='px-3 py-2 hover:bg-gray-700 rounded'>Sign In</NavLink>
            <NavLink to='/register' className='px-3 py-2 hover:bg-gray-700 rounded'>Register</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar