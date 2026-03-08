import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { bidOnJob } from '../api/bidApi';


function BidForm({ jobId }) {

    const [proposedPrice, setProposedPrice] = useState('');
    const [estimatedCompletionDate, setEstimatedCompletionDate] = useState('');
    const [message, setMessage] = useState('');

    const [error, setError] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const resetForm = () => {
        setProposedPrice('');
        setEstimatedCompletionDate('');
        setMessage('');
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setError('');
        try{
            const bidData = {
                proposedPrice,
                estimatedCompletionDate,
                message
            };
            const response = await bidOnJob(jobId, bidData);
            console.log('Bid submitted successfully:', response);
            resetForm();
            setInfoMessage(response.message || 'Bid submitted successfully!');
        } catch (err) {
            setError((err.response?.data?.message || 'Failed to submit bid. Please try again.'));
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Place a Bid</h1>
            <p className="text-gray-600 mt-2">Enter your bid details below</p>
        </div>
        {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                    {error}
                </div>
        )}
        {infoMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                    {infoMessage}
                </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="proposedPrice" className="block text-sm font-medium text-gray-700">Proposed Price</label>
                <input
                    type="number"
                    id="proposedPrice"
                    value={proposedPrice}
                    onChange={(e) => setProposedPrice(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="estimatedCompletionDate" className="block text-sm font-medium text-gray-700">Estimated Completion Date</label>
                <input
                    type="date"
                    id="estimatedCompletionDate"
                    value={estimatedCompletionDate}
                    onChange={(e) => setEstimatedCompletionDate(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
                Submit Bid
            </button>
        </form>
    </div>
  )
}

export default BidForm