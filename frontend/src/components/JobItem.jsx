
function JobItem({ job }) {
  const statusStyles = {
    open: 'bg-blue-100 text-blue-700',
    assigned: 'bg-amber-100 text-amber-700',
    in_progress: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  const statusClass = statusStyles[job?.status] || 'bg-gray-100 text-gray-700'

  const formattedStatus = (job?.status || 'unknown')
    .replace('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

  const preferredDate = job?.preferredDate
    ? new Date(job.preferredDate).toLocaleDateString()
    : 'Not specified'

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
        {/* title, category, preferredDate, status */}
        <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-semibold text-gray-900 leading-snug">{job?.title || 'Untitled Job'}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusClass}`}>
                {formattedStatus}
            </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Category:</span> {job?.category?.name || 'General'}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Preferred Date:</span> {preferredDate}
          </p>
        </div>
    </div>
  )
}

export default JobItem