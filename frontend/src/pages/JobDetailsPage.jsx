import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import JobDetails from '../components/JobDetails'
import { useAuth } from '../contexts/AuthContext';
import BidList from '../components/BidList';
import BidForm from '../components/BidForm';
import UpdateDialog from '../components/UpdateDialog';
import UpdateRequestDialog from '../components/UpdateRequestDialog';
import { useEffect, useState } from 'react';
import { getJobById } from '../api/jobsApi';

function JobDetailsPage() {
    const { jobId } = useParams();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [showBidForm, setShowBidForm] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [actionNotice, setActionNotice] = useState('');
    const navigate = useNavigate();

    const isTechnician = user?.role === 'technician';
    const isCustomer = user?.role === 'customer';
    const isJobOpen = job?.status === 'open';
    const isAssignedTech = job?.technician?._id === user?.id;
    const isJobOwner = job?.customer?._id === user?.id;

    const fetchJobDetails = async () => {
        const response = await getJobById(jobId);
        setJob(response);
    };

    const handleBidActionSuccess = async (_actionType, message) => {
        if (message) {
            setActionNotice(message);
        }
        await fetchJobDetails();
    };

    useEffect(() => {
        fetchJobDetails();
    }, [jobId])

  return (
    <div className='bg-gray-50 min-h-screen'>
    <main className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10'>
        {actionNotice && (
            <div className='mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>
                {actionNotice}
            </div>
        )}

        <button
            onClick={() => navigate(-1)}
            className='mb-6 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg shadow-sm'
        >
            ← Back
        </button>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
                <JobDetails jobData={job}/>
            </div>

            <div className='lg:col-span-1 space-y-4'>
                {isTechnician && isJobOpen && (
                    <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-4'>
                    <button
                        className={`w-full ${
                        showBidForm
                            ? 'bg-gray-600 hover:bg-gray-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm mb-4`}
                        onClick={() => setShowBidForm(prev => !prev)}
                    >
                        {showBidForm ? 'Close Bid Form' : 'Place a Bid'}
                    </button>

                    {showBidForm && <BidForm jobId={jobId} />}
                    </div>
                )}

                {isTechnician && isAssignedTech && (
                    <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-4'>
                    <button 
                        className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm'
                        onClick={() => setShowUpdateDialog(prev => !prev)}
                    >
                        {showUpdateDialog ? 'Close Update Dialog' : 'Update Job Status'}
                    </button>
                    {showUpdateDialog && <UpdateDialog jobStatus={job.status} jobId={jobId} />}
                    </div>
                )}

                {isCustomer && isJobOwner && isJobOpen && (
                    <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-4'>
                    <BidList jobId={jobId} onBidActionSuccess={handleBidActionSuccess} />
                    </div>
                )}

                {isCustomer && isJobOwner && !isJobOpen && (
                    <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-4'>
                     <UpdateRequestDialog jobId={jobId} />
                    </div>
                )}
            </div>
        </div>

    </main>
    </div>
  )
}

export default JobDetailsPage