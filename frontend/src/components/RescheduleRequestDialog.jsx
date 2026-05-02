import { useState } from 'react';

function RescheduleRequestDialog({ job, onClose, onSubmit, isSubmitting }) {
  const [proposedDate, setProposedDate] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!proposedDate) {
      setError('Please select a proposed date');
      return;
    }

    const proposedDateTime = new Date(proposedDate);
    const currentDateTime = new Date(job.prefferedDate);

    if (proposedDateTime <= currentDateTime) {
      setError('Proposed date must be after the current scheduled date');
      return;
    }

    await onSubmit({
      proposedDate: proposedDateTime,
      reason
    });
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
        <h2 className='text-xl font-bold text-gray-900'>Request Reschedule</h2>
        <p className='mt-2 text-sm text-gray-600'>
          Current scheduled date: {new Date(job.prefferedDate).toLocaleDateString()}
        </p>

        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Propose New Date <span className='text-red-500'>*</span>
            </label>
            <input
              type='date'
              value={proposedDate}
              onChange={(e) => setProposedDate(e.target.value)}
              disabled={isSubmitting}
              className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:bg-gray-100'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Reason (Optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isSubmitting}
              placeholder='Enter reason for reschedule...'
              maxLength='500'
              className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none disabled:bg-gray-100'
              rows='3'
            />
            <p className='mt-1 text-xs text-gray-500'>{reason.length}/500</p>
          </div>

          {error && (
            <div className='rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
              {error}
            </div>
          )}

          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className='flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 disabled:bg-gray-100'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400'
            >
              {isSubmitting ? 'Requesting...' : 'Request Reschedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RescheduleRequestDialog;
