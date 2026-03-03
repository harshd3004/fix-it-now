import { useParams } from "react-router-dom"
import Profile from '../components/Profile'
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const {userId} = useParams();
  const {user} = useAuth();
  return (
    <main className="container mx-auto px-8 py-16 max-w-4xl">
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">{userId == user.id ? 'My Profile' : 'User Profile'}</h1>
            <p className="text-gray-600 mt-2">View profile details</p>
        </div>
        <Profile userId={userId}/>
    </main>
  )
}

export default ProfilePage