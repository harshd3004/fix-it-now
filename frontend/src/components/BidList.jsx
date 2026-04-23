import { useEffect, useState } from 'react';
import BidItem from './BidItem';
import { getBidsForJob } from '../api/bidApi';

function BidList({ jobId, onBidActionSuccess }) {
    const [bids, setBids] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchBids = async () => {
      try {
        setIsLoading(true);
        const response = await getBidsForJob(jobId);
        setBids(response);
      } catch {
        setBids([]);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
        fetchBids();
    }, [jobId])

    const handleActionSuccess = async (actionType, message) => {
      await fetchBids();
      if (onBidActionSuccess) {
        await onBidActionSuccess(actionType, message);
      }
    };

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-gray-900'>Technician Bids</h2>
        <p className='text-gray-600 mt-2'>Review bids from interested technicians</p>
      </div>

      {isLoading && (
        <div className='mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700'>Refreshing bids...</div>
      )}
      
      {bids && bids.length > 0 ? (
        <div className='space-y-4'>
          {bids.map(bid => (
            <BidItem key={bid._id || bid.id} bid={bid} onActionSuccess={handleActionSuccess} />
          ))}
        </div>
      ) : (
        <div className='rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center'>
          <p className='text-gray-600 font-medium'>No bids yet</p>
          <p className='text-sm text-gray-500 mt-1'>Technicians will start bidding on this job soon.</p>
        </div>
      )}
    </div>
  )
}

export default BidList