import { Link } from "react-router-dom";
import { acceptBid, rejectBid } from '../api/bidApi';

function BidItem({ bid }) {
  
  const handleAcceptBid = () => {
    acceptBid(bid._id);
  };

  const handleRejectBid = () => {
    rejectBid(bid._id);
  };
  
  return (
    <div className='bg-linear-to-r from-blue-50 to-gray-50 rounded-xl p-5 border border-blue-100 hover:shadow-md transition-shadow duration-200'>
      {/* Technician Header */}
      <div className='flex items-start justify-between mb-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>{bid.technician?.name || 'Unknown Technician'}</h3>
          <p className='text-sm text-gray-600 mt-1'>{bid.technician?.technicianProfile?.rating || 'No rating'} ★</p>
        </div>
        <div className='text-right'>
          <p className='text-xs text-gray-600 font-medium'>Proposed Price</p>
          <p className='text-2xl font-bold text-blue-600'>${bid.proposedPrice || '0'}</p>
        </div>
      </div>

      {/* Details Grid */}
      <div className='grid grid-cols-2 gap-4 mb-4 py-4 border-y border-gray-200'>
        <div>
          <p className='text-xs text-gray-600 font-medium'>Estimated Completion</p>
          <p className='text-gray-700 font-medium'>{new Date(bid.estimatedCompletionDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className='text-xs text-gray-600 font-medium'>Experience</p>
          <p className='text-gray-700 font-medium'>{bid.technician?.technicianProfile?.experienceYears || '0'} years</p>
        </div>
      </div>

      {/* Message */}
      {bid.message && (
        <div className='bg-white rounded-lg p-4'>
          <p className='text-xs text-gray-600 font-medium mb-2'>Message</p>
          <p className='text-gray-700'>{bid.message}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className='flex gap-3 mt-4'>
        <Link to={`/profile/${bid.technician._id}`} className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200'>
          View Technician Profile
        </Link>
        <button onClick={handleAcceptBid} className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'>
          Accept Bid
        </button>
        <button onClick={handleRejectBid} className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200'>
          Decline
        </button>
      </div>
    </div>
  )
}

export default BidItem