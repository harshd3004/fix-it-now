import Navbar from '../components/Navbar'
import Profile from '../components/Profile'
import JobList from '../components/JobList'

function TechnicianDashboard() {
  return (
    <div className='bg-gray-50 min-h-screen'>
        <Navbar />

        <main className='container mx-auto px-8 py-8'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            
            {/* Left side - Profile Section */}
            <div className='lg:col-span-1 order-2 lg:order-1'>

              <Profile />

              {/* Recent Reviews */}
              <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Recent Reviews</h3>
                <div className='space-y-3'>
                  <div className='bg-blue-50 rounded-lg p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='font-medium text-gray-900'>★★★★★</span>
                      <span className='text-xs text-gray-600'>2 days ago</span>
                    </div>
                    <p className='text-gray-600 text-sm'>Great work! Very professional.</p>
                  </div>
                  <div className='bg-blue-50 rounded-lg p-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='font-medium text-gray-900'>★★★★☆</span>
                      <span className='text-xs text-gray-600'>1 week ago</span>
                    </div>
                    <p className='text-gray-600 text-sm'>Good service, on time.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Jobs Section */}
            <div className='lg:col-span-3 order-1 lg:order-2 space-y-6'>
              
              {/* View Available Jobs Button */}
              <div className='flex gap-3'>
                <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm'>
                  View Available Jobs
                </button>
                <button className='flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200'>
                  View Past Jobs
                </button>
              </div>

              {/* Active Jobs Section */}
              <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                <div className='flex items-center justify-between mb-6'>
                  <h2 className='text-2xl font-bold text-gray-900'>Active Jobs</h2>
                  <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold'>3 Active</span>
                </div>
                <JobList />
              </div>

            </div>

          </div>
        </main>
    </div>
  )
}

export default TechnicianDashboard