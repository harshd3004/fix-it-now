import { useAuth } from "../contexts/AuthContext";
import { loginUser } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        setIsLoading(true)

        try{
            const credentials = { email, password }
            const response = await loginUser(credentials)
            login(response.user, response.token)
            console.log('Login successful:', response)
            navigate('/')
        } catch (error) {
            console.error('Login failed:', error)
            setError('Invalid email or password. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                <p className="text-gray-600 mt-2">Sign in to your account to continue</p>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="your@email.com"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="••••••••"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                    Don't have an account? <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">Create one</Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login