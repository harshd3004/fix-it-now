import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../components/Navbar'

function Home() {
    const {user} = useAuth();
  return (
    <div>
        <Navbar/>
        {user ? <span className='text-3xl'>Welcome back, {user.name}!</span> : <span className='text-3xl'>Find Repair Services</span>}
        Home
    </div>
  )
}

export default Home