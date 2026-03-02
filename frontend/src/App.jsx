import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import TechnicianRegister from './pages/TechnicianRegister'
import PostJob from './pages/PostJob'
import ProfilePage from './pages/ProfilePage'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-technician" element={<TechnicianRegister />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/post-job" element={<PostJob/>}/>
        <Route path="/profile/:userId" element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
