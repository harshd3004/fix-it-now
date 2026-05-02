import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import JobDetails from '../components/JobDetails'
import { useAuth } from '../contexts/AuthContext';
import BidList from '../components/BidList';
import BidForm from '../components/BidForm';
import UpdateDialog from '../components/UpdateDialog';
import UpdateRequestDialog from '../components/UpdateRequestDialog';
import RescheduleRequestDialog from '../components/RescheduleRequestDialog';
import { useEffect, useState } from 'react';
import { getJobById, requestReschedule, getPendingRescheduleRequests, approveRescheduleRequest, rejectRescheduleRequest } from '../api/jobsApi';

function JobDetailsPage() {
    const { jobId } = useParams();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [showBidForm, setShowBidForm] = useState(false);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [actionNotice, setActionNotice] = useState('');
    const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
    const [rescheduleRequests, setRescheduleRequests] = useState([]);
    const [rescheduleSubmitting, setRescheduleSubmitting] = useState(false);
    const [rescheduleError, setRescheduleError] = useState('');
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

    const fetchRescheduleRequests = async () => {
        try {
            const response = await getPendingRescheduleRequests(jobId);
            setRescheduleRequests(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error('Failed to fetch reschedule requests:', error);
            setRescheduleRequests([]);
        }
    };

    const handleRescheduleSubmit = async (data) => {
        setRescheduleSubmitting(true);
        setRescheduleError('');
        try {
            await requestReschedule(jobId, data.proposedDate, data.reason);
            setActionNotice('Reschedule request submitted successfully!');
            setShowRescheduleDialog(false);
            await fetchRescheduleRequests();
            await fetchJobDetails();
        } catch (error) {
            setRescheduleError(error?.response?.data?.message || 'Failed to request reschedule');
        } finally {
            setRescheduleSubmitting(false);
        }
    };

    const handleApproveReschedule = async (requestId) => {
        try {
            await approveRescheduleRequest(requestId);
            setActionNotice('Reschedule request approved!');
            await fetchRescheduleRequests();
            await fetchJobDetails();
        } catch (error) {
            setRescheduleError(error?.response?.data?.message || 'Failed to approve reschedule');
        }
    };

    const handleRejectReschedule = async (requestId) => {
        try {
            await rejectRescheduleRequest(requestId);
            setActionNotice('Reschedule request rejected!');
            await fetchRescheduleRequests();
            await fetchJobDetails();
        } catch (error) {
            setRescheduleError(error?.response?.data?.message || 'Failed to reject reschedule');
        }
    };

    useEffect(() => {
        fetchJobDetails();
        fetchRescheduleRequests();
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
                    <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-3'>
                    <button 
                        className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm'
                        onClick={() => setShowUpdateDialog(prev => !prev)}
                    >
                        {showUpdateDialog ? 'Close Update Dialog' : 'Update Job Status'}
                    </button>
                    {showUpdateDialog && <UpdateDialog jobStatus={job?.status} jobId={jobId} />}

                    {job?.status === 'assigned' && (
                        <button 
                            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm'
                            onClick={() => setShowRescheduleDialog(true)}
                        >
                            Request Reschedule
                        </button>
                    )}

                    {showRescheduleDialog && job && (
                        <RescheduleRequestDialog 
                            job={job}
                            onClose={() => setShowRescheduleDialog(false)}
                            onSubmit={handleRescheduleSubmit}
                            isSubmitting={rescheduleSubmitting}
                        />
                    )}
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

                {isCustomer && isJobOwner && rescheduleRequests.length > 0 && (
                    <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-4'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Reschedule Requests</h3>
                        {rescheduleError && (
                            <div className='mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
                                {rescheduleError}
                            </div>
                        )}
                        <div className='space-y-3'>
                            {rescheduleRequests.map((request) => (
                                <div key={request._id} className='border border-gray-200 rounded-lg p-4'>
                                    <div className='flex justify-between items-start mb-3'>
                                        <div>
                                            <p className='font-medium text-gray-900'>{request.technician.name}</p>
                                            <p className='text-sm text-gray-600'>{request.technician.email}</p>
                                        </div>
                                        <span className={request.status === 'pending' ? 'bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full' : request.status === 'approved' ? 'bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full' : 'bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full'}>
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 mb-3 text-sm'>
                                        <div>
                                            <p className='text-gray-600'>Current Date</p>
                                            <p className='font-medium'>{new Date(request.currentDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className='text-gray-600'>Proposed Date</p>
                                            <p className='font-medium'>{new Date(request.proposedDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    {request.reason && (
                                        <p className='text-sm text-gray-600 mb-3'><span className='font-medium'>Reason:</span> {request.reason}</p>
                                    )}
                                    {request.status === 'pending' && (
                                        <div className='flex gap-2'>
                                            <button
                                                onClick={() => handleApproveReschedule(request._id)}
                                                className='flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm'
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleRejectReschedule(request._id)}
                                                className='flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm'
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>

    </main>
    </div>
  )
}

export default JobDetailsPage
