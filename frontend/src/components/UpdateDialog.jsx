import { updateJobStatus } from "../api/jobsApi";
import { useState } from "react";

function UpdateDialog({ jobStatus, jobId }) {

    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const statusFlow = {
        'assigned': ['in-progress'],
        'in-progress': ['completed', 'cancelled'],
        'completed': [],
        'cancelled': []
    }

    const formatStatus = (status) =>
        status
            ?.replace('-', ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase()) || 'Unknown';

    const handleJobUpdate = async(nextStatus) => {
        if (isLoading) return;
        setIsLoading(true);
        setError('');
        setInfoMessage('');
        try{
            const response = await updateJobStatus(jobId, jobStatus, nextStatus);
            setInfoMessage(response.message || 'Job status update request sent successfully!');
        }catch (err) {
            setError('Failed to update job status : ' + (err.response?.data?.message || 'Please try again.'));
        }finally{
            setIsLoading(false);
        }
    }

    const nextStatuses = statusFlow[jobStatus] || [];
  return (
       <div className='p-6 bg-white rounded-xl shadow-sm border border-gray-200 mt-4'>
            {/* Header */}
            <div className='mb-5'>
                <h3 className='text-lg font-semibold text-gray-900'>
                    Update Job Status
                </h3>
                <p className='text-sm text-gray-600 mt-1'>
                    A request will be sent to the customer
                </p>
            </div>

            {/* Current Status */}
            <div className='mb-6 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3'>
                <span className='text-xs font-medium tracking-wide uppercase text-gray-500'>Current Status</span>
                <div className='mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full bg-gray-200 text-gray-700'>
                    {formatStatus(jobStatus)}
                </div>
            </div>

            {/* Actions */}
            <div className='flex flex-col gap-3'>

                {nextStatuses.length > 0 ? (
                    nextStatuses.map(status => {
                        const isDanger = status === 'cancelled';

                        return (
                            <button
                                key={status}
                                disabled={isLoading}
                                onClick={() => handleJobUpdate(status)}
                                className={`
                                  w-full text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200
                                    ${isDanger 
                                        ? 'bg-red-500 hover:bg-red-600' 
                                        : 'bg-blue-600 hover:bg-blue-700'}
                                    ${isLoading ? 'opacity-60 cursor-not-allowed' : 'shadow-sm'}
                                `}
                            >
                                {isLoading ? 'Processing...' : `Mark as ${formatStatus(status)}`}
                            </button>
                        );
                    })
                ) : (
                    <p className='text-sm text-gray-500 italic'>
                        No available status updates
                    </p>
                )}

                {/* Feedback Messages */}
                {error && (
                    <div className='p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm'>
                        {error}
                    </div>
                )}

                {infoMessage && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                        {infoMessage}
                    </div>
                )}
            </div>
        </div>
  )
}

export default UpdateDialog