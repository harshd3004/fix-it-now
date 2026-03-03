import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import TechnicianRegister from './pages/TechnicianRegister'
import PostJob from './pages/PostJob'
import ProfilePage from './pages/ProfilePage'
import TechnicianDashboard from './pages/TechnicianDashboard'
import JobListingPage from './pages/JobListingPage'
import JobDetailsPage from './pages/JobDetailsPage'
import MainLayout from './layouts/MainLayout'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/register-technician" element={<TechnicianRegister />} />
        <Route path="/login" element={<Login/>}/>

        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/post-job" element={<PostJob/>}/>
          <Route path="/profile/:userId" element={<ProfilePage/>}/>
          <Route path="/technician-dashboard" element={<TechnicianDashboard/>}/>
          <Route path="/jobs" element={<JobListingPage/>} />
          <Route path="/job/:jobId" element={<JobDetailsPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
