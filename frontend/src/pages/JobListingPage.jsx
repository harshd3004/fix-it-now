import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { getJobs } from '../api/jobsApi';
import JobList from '../components/JobList';
import { useAuth } from '../contexts/AuthContext';

function JobListingPage() {
    const [searchParams] = useSearchParams();    

    const [jobs, setJobs] = useState([]);
    const type = searchParams.get("type");
    const { user } = useAuth();

    let title = "";
    let filter = null;

    if (type === "available") {
        title = "Available Jobs";
        filter = {
            technicianId: user.id,
            status: "open"
        };
    }

    if (type === "past") {
        title = "Past Jobs";
        filter = {
            technicianId: user.id,
            status: ["completed", "cancelled"]
        };
    }

    useEffect(() => {
        if (!filter) return;
        async function fetchJobs() {
            const response = await getJobs(filter);
            setJobs(response);
        }
        fetchJobs();
    },[type, user])

  return (
        <main className="container mx-auto px-8 py-10">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{title || 'Jobs'}</h1>
                <p className="text-gray-600 mt-2">Browse and manage jobs with quick status visibility.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                {/*Impleming filtering in future*/}
                <JobList jobs={jobs} />
            </div>
        </main>
  )
}

export default JobListingPage