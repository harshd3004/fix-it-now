import { useEffect, useState } from 'react';
import {
  getPendingTechnicians,
  approveTechnicianVerification,
  rejectTechnicianVerification
} from '../../api/adminApi';

function TechnicianVerification() {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const [processingId, setProcessingId] = useState(null);

  const fetchPendingTechnicians = async () => {
    setLoading(true);
    setError('');
    setActionMessage('');

    try {
      const response = await getPendingTechnicians();
      setTechnicians(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch pending technicians.');
      setTechnicians([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTechnicians();
  }, []);

  const handleApprove = async (technicianId) => {
    setProcessingId(technicianId);
    setError('');
    setActionMessage('');

    try {
      const response = await approveTechnicianVerification(technicianId);
      setActionMessage(response.message || 'Technician approved successfully!');
      
      setTechnicians(technicians.filter(t => t._id !== technicianId));
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to approve technician.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (technicianId) => {
    setProcessingId(technicianId);
    setError('');
    setActionMessage('');

    try {
      const response = await rejectTechnicianVerification(technicianId);
      setActionMessage(response.message || 'Technician rejected successfully!');
      
      setTechnicians(technicians.filter(t => t._id !== technicianId));
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to reject technician.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <section className='flex-1 space-y-6'>
      <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
        <h1 className='text-3xl font-bold text-gray-900'>Technician Verification</h1>
        <p className='mt-2 text-gray-600'>Review and approve/reject pending technician verifications</p>
      </div>

      {loading && (
        <div className='rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700'>
          Loading pending technicians...
        </div>
      )}

      {error && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
          {error}
        </div>
      )}

      {actionMessage && (
        <div className='rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700'>
          {actionMessage}
        </div>
      )}

      {!loading && !error && technicians.length === 0 && (
        <div className='rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center'>
          <p className='text-gray-600 font-medium'>No pending technicians</p>
          <p className='text-sm text-gray-500 mt-1'>All technicians have been verified or no new registrations pending.</p>
        </div>
      )}

      {!loading && technicians.length > 0 && (
        <div className='overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm'>
          <table className='w-full'>
            <thead className='border-b border-gray-200 bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Name</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Email</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Experience</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Skills</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {technicians.map((technician) => (
                <tr key={technician._id} className='hover:bg-gray-50'>
                  <td className='px-6 py-3 text-sm font-medium text-gray-900'>{technician.name}</td>
                  <td className='px-6 py-3 text-sm text-gray-600'>{technician.email}</td>
                  <td className='px-6 py-3 text-sm text-gray-600'>
                    {technician.technicianProfile?.experienceYears || 0} years
                  </td>
                  <td className='px-6 py-3 text-sm text-gray-600'>
                    {technician.technicianProfile?.skills?.length > 0
                      ? technician.technicianProfile.skills
                          .map((skill) => skill.name)
                          .join(', ')
                      : 'No skills listed'}
                  </td>
                  <td className='px-6 py-3'>
                    <div className='flex gap-2'>
                      <button
                        type='button'
                        onClick={() => handleApprove(technician._id)}
                        disabled={processingId === technician._id}
                        className='rounded-lg bg-green-600 px-3 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-green-700 disabled:bg-green-400'
                      >
                        {processingId === technician._id ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        type='button'
                        onClick={() => handleReject(technician._id)}
                        disabled={processingId === technician._id}
                        className='rounded-lg bg-red-600 px-3 py-1 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-700 disabled:bg-red-400'
                      >
                        {processingId === technician._id ? 'Processing...' : 'Reject'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TechnicianVerification;
