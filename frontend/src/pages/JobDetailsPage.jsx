import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import JobDetails from '../components/JobDetails'
import { useAuth } from '../contexts/AuthContext';
import BidList from '../components/BidList';
import { useEffect, useState } from 'react';
import { getJobById } from '../api/jobsApi';
import Navbar from '../components/Navbar';

function JobDetailsPage() {
    const { jobId } = useParams();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchJobDetails() {
            const response = await getJobById(jobId);
            setJob(response);
        }
        fetchJobDetails();
    }, [jobId])

  return (
    <div className='bg-gray-50 min-h-screen'>
        <Navbar />
        <main className='container mx-auto px-8 py-12'>
            <button
                onClick={() => navigate(-1)}
                className='mb-6 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg'
            >
                ← Back
            </button>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2'>
                    <JobDetails jobData={job}/>
                </div>

                <div className='lg:col-span-1'>
                    {user && user.role === 'technician' && job && job.status === 'open' && (
                        <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm mb-4'>
                            Place a Bid
                        </button>
                    )}

                    {user && user.role === 'technician' && job && job.technician && job.technician._id === user.id && (
                        <button className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm'>
                            Update Job Status
                        </button>
                    )}
                </div>
            </div>

            {user && user.role === 'customer' && (
                <div className='mt-12'>
                    <BidList jobId={jobId} />
                </div>
            )}
        </main>
    </div>
  )
}

export default JobDetailsPage