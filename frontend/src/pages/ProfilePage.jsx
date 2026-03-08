import { useParams } from "react-router-dom"
import Profile from '../components/Profile'
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const {userId} = useParams();
  const {user} = useAuth();
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-8 py-16 max-w-4xl">
      <button
            onClick={() => navigate(-1)}
            className='mb-6 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg'
        >
            ← Back
        </button>
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">{userId == user.id ? 'My Profile' : 'User Profile'}</h1>
            <p className="text-gray-600 mt-2">View profile details</p>
        </div>
        <Profile userId={userId}/>
    </main>
  )
}

export default ProfilePage