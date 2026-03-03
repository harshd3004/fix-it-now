import { useState, useEffect } from 'react';
import { getCategoriesList } from '../api/categoryApi';
import { postJob } from '../api/jobsApi';
import { useNavigate } from 'react-router-dom';
import SkillDropdown from '../components/SkillDropdown';

function PostJob() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [preferredDate, setPreferredDate] = useState('');

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {        
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try{
            const jobData = { title, description, categoryId: category, preferredDate };
            const response = await postJob(jobData);
            console.log('Job posted successfully:', response);
            
            navigate('/');
            
        }catch(error){
            setError('Failed to post job. Please try again.');
            if(error.response.data.message){
                setError(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
         async function fetchCategories() {
            const fetchedCategories = await getCategoriesList();
            setCategories(fetchedCategories);
         }
        fetchCategories();
    },[])

    return (
        <div className="bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center py-6 px-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Post a Job</h1>
                    <p className="text-gray-600 mt-2">Describe the job you want to post</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">Job Title</label>
                        <input 
                            type="text" 
                            id="title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g. Need a plumber for a leaking pipe"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">Job Description</label>
                        <textarea 
                            id="description"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Provide details about the job, requirements, and any other relevant information."
                            rows={4}
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                        <input 
                            type="text" 
                            id="location"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g. 123 Main Street, Kolhapur"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
                        <SkillDropdown id="category" skillOptions={categories} onSkillSelect={(value) => setCategory(value)} />
                    </div>
                    <div>
                        <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-900 mb-2">Preferred Date</label>
                        <input
                            type="date"
                            id="preferredDate"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            value={preferredDate}
                            onChange={(e) => setPreferredDate(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        {isLoading ? 'Posting...' : 'Post Job'} 
                    </button>
                </form>
            </div>

        </div>
    )
}

export default PostJob;