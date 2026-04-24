import { useState, useEffect } from 'react';
import { getUserProfile } from "../api/userApi";
import SkillsList from "./SkillsList";

function Profile({ userId }) {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        async function fetchProfileData() {
            try {
                const response = await getUserProfile(userId)
                setProfileData(response)
            } catch (error) {
                console.error('Error fetching profile data:', error)
            }
        }
        fetchProfileData();
    },[])
  return (
    <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
            {/* User basic data */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{profileData?.name || "User Name"}</h2>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Email:</span>
                        <span className="text-gray-600">{profileData?.email || "john.doe@example.com"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Phone:</span>
                        <span className="text-gray-600">{profileData?.phone || "+91 12345 67890"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-700">Address:</span>
                        <span className="text-gray-600">{profileData?.address || "123 Main Street, Kolhapur"}</span>
                    </div>
                </div>
            </div>
            {/* Edit basic data profile button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-sm">Edit Profile</button>
            
            {/* technician specific data*/}
            {   profileData?.role === 'technician' && (
                    <div className="mt-8 pt-8 border-t border-gray-200 space-y-6">
                        {/* skills section */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                            <SkillsList skills={profileData.technicianProfile.skills || []} />
                        </div>
            
                        {/* Rating section */}
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rating</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-blue-600">
                                    {profileData.technicianProfile.ratingAverage ?? profileData.technicianProfile.averageRating ?? 0}
                                </span>
                                <span className="text-gray-600">
                                    out of 5 ({profileData.technicianProfile.ratingCount ?? profileData.technicianProfile.reviewCount ?? 0} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Experience years*/ }
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Experience</h3>
                            <p className="text-2xl font-bold text-gray-700">{profileData.technicianProfile.experienceYears || 0} <span className="text-base font-normal text-gray-600">years</span></p>
                        </div>

                        {/* Verification status section */}
                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verification Status</h3>
                            <p className={`font-semibold ${profileData.technicianProfile.isVerified ? 'text-green-600' : 'text-orange-600'}`}>
                                {profileData.technicianProfile.isVerified ? "✓ Verified Technician" : "⚠ Not Verified"}
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Profile