import { useState } from 'react'
import { registerUser } from '../api/authApi'
import { Link, useNavigate } from 'react-router-dom'
function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = { name, email, password, phone, address, role: 'customer' };
            const response = await registerUser(userData);
            console.log('Registration successful:', response);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input type="text" id="name" className="w-full px-3 py-2 border rounded" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" className="w-full px-3 py-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" className="w-full px-3 py-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Phone</label>
            <input type="text" id="phone" className="w-full px-3 py-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700">Address</label>
              <input type="text" id="address" className="w-full px-3 py-2 border rounded" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <Link to="/register-technician" className='hover:text-blue-400'> Register as Technician ?</Link>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register