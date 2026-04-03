import { useState, useEffect } from 'react';
import { getStatusRequest, approveStatusRequest, rejectStatusRequest } from '../api/jobsApi';

function UpdateRequestDialog( { jobId } ) {
  const [statusRequest, setStatusRequest] = useState(null);

  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formatStatus = (status) =>
    status
      ?.replace('-', ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase()) || 'Unknown';

  useEffect(() => {
    async function fetchStatusRequest() {
        setIsLoading(true);
        setError('');
        setInfoMessage('');
        try {
            const response = await getStatusRequest(jobId);
            setStatusRequest(response);
        } catch (error) {
            console.error('Error fetching status requests:', error.response?.data?.message || error.message);
            setError(error.response?.data?.message || 'An error occurred while fetching status requests.');
        }finally {
            setIsLoading(false);
        }
    }
    fetchStatusRequest();
  }, [jobId]);

  const approveRequest = async() => {
    setIsLoading(true);
    setError('');
    setInfoMessage('');
    try {
      const response = await approveStatusRequest(statusRequest._id);
      setInfoMessage(response.message || 'Status update request approved successfully!');
      setStatusRequest(null);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while approving the status request.');
    } finally {
      setIsLoading(false);
    }
  }

  const rejectRequest = async() => {
    setIsLoading(true);
    setError('');
    setInfoMessage('');
    try {
      const response = await rejectStatusRequest(statusRequest._id);
      setInfoMessage(response.message || 'Status update request rejected successfully!');
      setStatusRequest(null);
    }catch (error) {
      setError(error.response?.data?.message || 'An error occurred while rejecting the status request.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    { statusRequest && (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Pending Update Request</h2>
        <p className="text-sm text-gray-600 mt-1">The assigned technician requested a status change for this job.</p>

        <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-gray-600">From</span>
            <span className="px-3 py-1 rounded-full font-semibold bg-gray-200 text-gray-700">
              {formatStatus(statusRequest.fromStatus)}
            </span>
            <span className="text-gray-500">to</span>
            <span className="px-3 py-1 rounded-full font-semibold bg-blue-100 text-blue-700">
              {formatStatus(statusRequest.toStatus)}
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => approveRequest()}
            disabled={isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            {isLoading ? 'Processing...' : 'Approve Request'}
          </button>
          <button
            onClick={() => rejectRequest()}
            disabled={isLoading}
            className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            {isLoading ? 'Processing...' : 'Reject Request'}
          </button>
        </div>
      </div>
    )}

      {!statusRequest && !isLoading && !error && (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Update Requests</h2>
          <p className="text-sm text-gray-600 mt-2">No pending status requests for this job.</p>
        </div>
      )}

      {isLoading && (
        <div className="p-4 mt-4 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg text-sm">
          Loading request details...
        </div>
      )}

      {error && (
          <div className='mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm'>
              {error}
          </div>
      )}
      {infoMessage && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {infoMessage}
          </div>
      )}
      
    </>
  )
}

export default UpdateRequestDialog