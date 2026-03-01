import { useAuth } from "../../contexts/AuthContext";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const credentials = { email, password }
            const response = await loginUser(credentials)
            login(response.user, response.token)
            console.log('Login successful:', response)
            navigate('/')
        } catch (error) {
            console.error('Login failed:', error)
        }
    }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" className="w-full px-3 py-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" id="password" className="w-full px-3 py-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Login</button>
            </form>
        </div>

    </div>
  )
}

export default Login