import { Link } from "react-router-dom";
import { useState } from 'react';
import { acceptBid, rejectBid } from '../api/bidApi';

function BidItem({ bid, onActionSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [actionError, setActionError] = useState('');

  const handleBidAction = async (actionType) => {
    setIsSubmitting(true);
    setActionMessage('');
    setActionError('');

    try {
      if (actionType === 'accept') {
        await acceptBid(bid._id);
        setActionMessage('Bid accepted successfully. Refreshing job details...');
      } else {
        await rejectBid(bid._id);
        setActionMessage('Bid declined successfully. Refreshing job details...');
      }

      if (onActionSuccess) {
        await onActionSuccess(actionType, actionType === 'accept' ? 'Bid accepted successfully.' : 'Bid declined successfully.');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || `Failed to ${actionType} bid. Please try again.`;
      setActionError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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

      {actionMessage && (
        <div className='mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>
          {actionMessage}
        </div>
      )}

      {actionError && (
        <div className='mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>
          {actionError}
        </div>
      )}

      {/* Action Buttons */}
      <div className='flex gap-3 mt-4'>
        {bid.technician?._id ? (
          <Link to={`/profile/${bid.technician._id}`} className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200'>
            View Technician Profile
          </Link>
        ) : (
          <button disabled className='flex-1 bg-gray-200 text-gray-500 font-semibold py-2 px-4 rounded-lg cursor-not-allowed'>
            Profile Unavailable
          </button>
        )}
        <button
          onClick={() => handleBidAction('accept')}
          disabled={isSubmitting}
          className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
        >
          {isSubmitting ? 'Processing...' : 'Accept Bid'}
        </button>
        <button
          onClick={() => handleBidAction('reject')}
          disabled={isSubmitting}
          className='flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-300 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors duration-200'
        >
          {isSubmitting ? 'Processing...' : 'Decline'}
        </button>
      </div>
    </div>
  )
}

export default BidItem