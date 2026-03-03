import { Link } from "react-router-dom"
import JobItem from "./JobItem"

function JobList({
    jobs
}) {
  return (
    <div className="space-y-4">
      {jobs && jobs.length > 0 ? (
        jobs.map((job) => (
            <Link
              to={`/job/${job._id}`}
              key={job._id}
              className="block rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <JobItem job={job} />
            </Link>
        ))
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="text-gray-600 font-medium">No jobs to display.</p>
          <p className="text-sm text-gray-500 mt-1">Try switching the listing type or check back later.</p>
        </div>
      )}
    </div>
  )
}

export default JobList