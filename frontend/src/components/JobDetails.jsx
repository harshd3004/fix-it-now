function JobDetails({ jobData }) {
  const statusStyles = {
    open: 'bg-blue-100 text-blue-700',
    assigned: 'bg-amber-100 text-amber-700',
    in_progress: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  const statusClass = statusStyles[jobData?.status] || 'bg-gray-100 text-gray-700'
  const formattedStatus = (jobData?.status || 'unknown')
    .replace('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <div>
        {jobData && (
            <div className='space-y-6'>
                {/* Header Section */}
                <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                    <div className='flex items-start justify-between gap-4 mb-4'>
                        <h1 className='text-3xl font-bold text-gray-900'>{jobData.title}</h1>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${statusClass}`}>
                            {formattedStatus}
                        </span>
                    </div>
                    <p className='text-gray-700 text-lg leading-relaxed'>{jobData.description}</p>
                </div>

                {/* Details Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* Left Column */}
                    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Job Information</h3>
                        <div className='space-y-3'>
                            <div>
                                <p className='text-sm font-medium text-gray-700'>Category</p>
                                <p className='text-gray-600'>{jobData.category?.name || 'Not specified'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-700'>Posted by</p>
                                <p className='text-gray-600'>{jobData.customer?.name || 'Unknown'}</p>
                            </div>
                            <div>
                                <p className='text-sm font-medium text-gray-700'>Preferred Date</p>
                                <p className='text-gray-600'>{new Date(jobData.preferredDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Assignment</h3>
                        <div className='space-y-3'>
                            <div>
                                <p className='text-sm font-medium text-gray-700'>Assigned Technician</p>
                                <p className='text-gray-600'>{jobData.technician ? jobData.technician.name : 'Not assigned'}</p>
                            </div>
                            {jobData.completionDate && (
                                <div>
                                    <p className='text-sm font-medium text-gray-700'>Completion Date</p>
                                    <p className='text-gray-600'>{new Date(jobData.completionDate).toLocaleDateString()}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default JobDetails