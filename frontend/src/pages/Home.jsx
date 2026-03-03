import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobs } from '../api/jobsApi';
import JobList from '../components/JobList';

function Home() {
    const {user, loading} = useAuth();
    const navigate = useNavigate();
    const [activeJobs, setActiveJobs] = useState([]);

    useEffect(() => {
      if(loading) return;
      if(!user) return;
      if(user.role === 'technician') navigate('/technician-dashboard');

      async function fetchActiveJobs() {
        const response = await getJobs({ customerId: user.id, status: ["open", "assigned", "in-progress"] });
        setActiveJobs(response);
      }
      fetchActiveJobs();
    }, [user])
    
  return (
    
    <main className='container mx-auto px-8 py-16'>
      {user ? (
        <div className='space-y-8'>
          <div className='bg-white rounded-xl shadow-sm p-8 border border-gray-200'>
            <h1 className='text-4xl font-bold text-gray-900'>Welcome back, <span className='text-blue-600'>{user.name}</span>!</h1>

           </div>
           <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
             <Link to='/post-job' className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-sm text-center'>Post Your Problem</Link>
             <Link to='/jobs?type=past' className='bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-center'>My Service History</Link>
           </div>
         </div>
       ) : (
         <div className='max-w-3xl space-y-8'>
           <div className='space-y-4'>
             <h1 className='text-5xl font-bold text-gray-900'>Find Repair Services</h1>
             <p className='text-lg text-gray-600 leading-relaxed'>Easily connect with skilled technicians for all your repair needs. Whether it's plumbing, electrical work, or appliance repairs, we've got you covered. Get reliable service at your fingertips!</p>
           </div>
           <div className='flex gap-4 flex-col sm:flex-row'>
             <Link to='/register' className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-sm text-center'>Get Started</Link>
             <Link to='/login' className='bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-8 rounded-lg border-2 border-blue-600 transition-colors duration-200 text-center'>Sign In</Link>
           </div>
         </div>
       )}

      {activeJobs && activeJobs.length > 0 && (
        <section className='mt-20 space-y-8'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-900'>Your Ongoing Jobs</h2>
            <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold'>{activeJobs.length} Active</span>
          </div>
          <JobList jobs={activeJobs} />
        </div>
        </section>
      )}
      
          
       <section className='mt-20 space-y-8'>
         <div>
           <h2 className='text-3xl font-bold text-gray-900 mb-2'>Explore Services</h2>
           <p className='text-gray-600'>Browse popular service categories</p>
         </div>
         <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
           {['Plumbing', 'Electrical', 'Appliance Repair'].map((category, i) => (
             <div key={i} className='bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer'>
               <div className='w-12 h-12 bg-blue-100 rounded-lg mb-4'></div>
               <h3 className='text-lg font-semibold text-gray-900'>{category}</h3>
               <p className='text-gray-600 text-sm mt-2'>Find local technicians</p>
             </div>
           ))}
         </div>
       </section>
     </main>
  )
}

export default Home