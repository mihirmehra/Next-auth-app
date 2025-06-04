"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function UserProfile() {
    interface UserData {
        email: string;
        bio: string;
        username: string;
        dateOfBirth: string;
        nationality: string;
        languages: string;
        currentPosition: string;
        workExperience: string;
        education: string;
        skills: string;
        aboutYou: string;
        professionalGoals: string;
        phoneNumber: number;
        location: string;
    }

    interface AchivementData {
        title: string,
        description: string,
    }

    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [achievementData, setAchievementData] = useState<AchivementData[]>([]);
    const [achievementTitle, setAchievementTitle] = useState("");
    const [achievementDescription, setAchievementDescription] = useState("");
    

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/user');
            console.log(res.data.data);
            setData(res.data.data);
        } catch (error: any) {
            toast.error("Failed to fetch user details: " + error.message);
        }
    };

    const getAchivementDetails = async () => {
        try {
            const res = await axios.get('/api/achivements/achivement');
            const data = await res.data;
            console.log(data.data);
            setAchievementData(data.data);
        } catch (error:any) {
            console.log("Failed to fetch achivement details: " +error.message)
        }
    }


    useEffect(() => {
        getUserDetails();
        getAchivementDetails();
    }, []);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleSaveChanges = async () => {
        if (!data) return;

        const updatedData = {
            username: (document.getElementById("editName") as HTMLInputElement).value,
            bio: (document.getElementById("editBio") as HTMLInputElement).value,
            dateOfBirth: (document.getElementById("editDateOfBirth") as HTMLInputElement).value,
            nationality: (document.getElementById("editNationality") as HTMLInputElement).value,
            languages: (document.getElementById("editLanguages") as HTMLInputElement).value,
            currentPosition: (document.getElementById("editCurrentPosition") as HTMLInputElement).value,
            workExperience: (document.getElementById("editWorkExperience") as HTMLInputElement).value,
            education: (document.getElementById("editEducation") as HTMLInputElement).value,
            skills: (document.getElementById("editSkills") as HTMLInputElement).value,
            aboutYou: (document.getElementById("editAboutYou") as HTMLTextAreaElement).value,
            professionalGoals: (document.getElementById("editProfessionalGoals") as HTMLTextAreaElement).value,
            phoneNumber: (document.getElementById("editPhoneNumber") as HTMLTextAreaElement).value,
            location: (document.getElementById("editLocation") as HTMLTextAreaElement).value,
        };

        try {
            const response = await axios.put('/api/users/user', updatedData);
            setData(response.data.data);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error: any) {
            toast.error("Failed to update profile: " + error.message);
        }
    };

    const handleModalActive = () => {
        const modal = document.getElementById("achievementModal");
        modal?.classList.toggle("hidden");
        modal?.classList.toggle("flex");
    };

    const handleAddAchievement = async () => {
        if (!achievementTitle || !achievementDescription) {
            toast.error("Please fill in all fields.");
            return;
        }
    
        const newAchievement = {
            user: data,
            title: achievementTitle,
            description: achievementDescription,
            date: Date.now(),
        };
    
        try {
            const response = await axios.post('/api/achivements/achivement', newAchievement);
            toast.success("Achievement added successfully!");
            setAchievementTitle(""); 
            setAchievementDescription("");
            handleModalActive();
        } catch (error: any) {
            toast.error("Failed to add achievement: " + error.message);
        }
    };
    

    return (

        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="bg-white rounded-lg shadow-sm p-8">
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-8">
                    <div className="profile-image w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md border-2 border-gray-100">
                        <img
                            src="https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20young%20adult%20with%20a%20friendly%20smile%2C%20clean%20background%2C%20high%20quality%20professional%20headshot%2C%20natural%20lighting%2C%20soft%20shadows%2C%20clear%20facial%20features%2C%20business%20casual%20attire&width=300&height=300&seq=profile1&orientation=squarish"
                            alt="Profile Picture"
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                        {data?.username}
                    </h1>
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                id="editBio"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                defaultValue={data?.bio}
                            />
                        ) : (
                            <span>{data?.bio}</span>
                        )}
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mb-2 mt-5">
                        <div className="flex items-center gap-2 text-gray-700">
                            <div className="w-5 h-5 flex items-center justify-center text-primary">
                                <i className="ri-mail-line" />
                            </div>
                            <span>{data?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <div className="w-5 h-5 flex items-center justify-center text-primary">
                                <i className="ri-phone-line" />
                            </div>
                            {isEditing ? (
                                <input
                                    type="number"
                                    id="editPhoneNumber"
                                    className="w-[200px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                    defaultValue={data?.phoneNumber}
                                />
                            ) : (
                                <span>{data?.phoneNumber}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <div className="w-5 h-5 flex items-center justify-center text-primary">
                                <i className="ri-map-pin-line" />
                            </div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    id="editLocation"
                                    className="w-[200px] px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                    defaultValue={data?.location}
                                />
                            ) : (
                                <span>{data?.location}</span>
                            )}
                        </div>
                    </div>
                </div>
                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-6">
                    <div className="flex space-x-8">
                        <button
                            className={`tab py-3 px-1 border-b-2 ${activeTab === "personal" ? "border-primary text-primary" : "border-transparent text-gray-500"} font-medium`}
                            onClick={() => handleTabClick("personal")}
                            data-tab="personal"
                        >
                            Personal Details
                        </button>
                        <button
                            className={`tab py-3 px-1 border-b-2 ${activeTab === "achievements" ? "border-primary text-primary" : "border-transparent text-gray-500"} font-medium`}
                            onClick={() => handleTabClick("achievements")}
                            data-tab="achievements"
                        >
                            Achievements
                        </button>
                        <button
                            className={`tab py-3 px-1 border-b-2 ${activeTab === "social" ? "border-primary text-primary" : "border-transparent text-gray-500"} font-medium`}
                            onClick={() => handleTabClick("social")}
                            data-tab="social"
                        >
                            Social Links
                        </button>
                    </div>
                </div>
                {/* Tab Content */}
                <div className="tab-content-container">
                    {activeTab === "personal" && (
                        <div id="personal" className="tab-content active">
                            <div className="flex justify-end mb-4">
                                <button
                                    id="editProfileBtn"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50 rounded"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    <i className="ri-edit-line" />
                                    <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Full Name</div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="editName"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            defaultValue={data?.username}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displayName">
                                            {data?.username}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Date of Birth</div>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            id="editDateOfBirth"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            defaultValue={data?.dateOfBirth}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displayDateOfBirth">
                                            {data?.dateOfBirth}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Nationality</div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="editNationality"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            defaultValue={data?.nationality}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displayNationality">
                                            {data?.nationality}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Languages</div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="editLanguages"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            defaultValue={data?.languages}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displayLanguages">
                                            {data?.languages}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Current CurrentPosition</div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="editCurrentPosition"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            defaultValue={data?.currentPosition}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displayCurrentPosition">
                                            {data?.currentPosition}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Work WorkExperience</div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="editWorkExperience"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            defaultValue={data?.workExperience}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displayWorkExperience">
                                            {data?.workExperience}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Education</div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="editEducation"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            defaultValue={data?.education}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displayEducation">
                                            {data?.education}
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Skills</div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="editSkills"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            defaultValue={data?.skills}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displaySkills">
                                            {data?.skills}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">AboutYou Me</div>
                                    {isEditing ? (
                                        <textarea
                                            id="editAboutYou"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            rows={6}
                                            defaultValue={data?.aboutYou}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displayAboutYou">
                                            <p>{data?.aboutYou}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Professional ProfessionalGoals</div>
                                    {isEditing ? (
                                        <textarea
                                            id="editProfessionalGoals"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary"
                                            rows={3}
                                            defaultValue={data?.professionalGoals}
                                        />
                                    ) : (
                                        <div className="text-gray-800" id="displayProfessionalGoals">
                                            <p>{data?.professionalGoals}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isEditing && (
                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        id="cancelEdit"
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        id="saveProfile"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-600/90"
                                        onClick={handleSaveChanges}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>

                    )}
                    {activeTab === "achievements" && (
                        <div id="achievements" className="tab-content">
                            <div className="flex justify-end mb-4">
                                <button id="addAchievementBtn"
                                    onClick={handleModalActive}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-gray-50 rounded">
                                    <i className="ri-add-line"></i>
                                    <span>Add Achievement</span>
                                </button>
                            </div>
                            <div className="space-y-6">
                                {achievementData.length > 0 ? (
                                    achievementData.map((achievement, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                            <div  className="mb-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-medium text-gray-900">
                                                        {achievement.title}
                                                    </h3>
                                                    <span className="text-sm text-gray-500">2024</span>
                                                </div>
                                                <p className="text-gray-700">
                                                    {achievement.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No achievements found.</p>
                                )}
                            
                            </div>
                        </div>
                    )}
                    {activeTab === "social" && (
                        <div id="social" className="tab-content">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a
                                    href="#"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full mr-3">
                                        <i className="ri-linkedin-fill ri-lg" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">LinkedIn</div>
                                        <div className="text-sm text-gray-600">@alexandra-richardson</div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-full mr-3">
                                        <i className="ri-github-fill ri-lg" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">GitHub</div>
                                        <div className="text-sm text-gray-600">@alexr-design</div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-pink-600 text-white rounded-full mr-3">
                                        <i className="ri-dribbble-fill ri-lg" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Dribbble</div>
                                        <div className="text-sm text-gray-600">@alex.richardson</div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-blue-400 text-white rounded-full mr-3">
                                        <i className="ri-twitter-fill ri-lg" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Twitter</div>
                                        <div className="text-sm text-gray-600">@alexrichardson_ux</div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full mr-3">
                                        <i className="ri-youtube-fill ri-lg" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">YouTube</div>
                                        <div className="text-sm text-gray-600">@DesignWithAlex</div>
                                    </div>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center bg-orange-500 text-white rounded-full mr-3">
                                        <i className="ri-rss-fill ri-lg" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Blog</div>
                                        <div className="text-sm text-gray-600">
                                            designperspectives.com
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Me</h3>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                            >
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-600/90 transition-colors whitespace-nowrap"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div
                id="achievementModal"
                className="hidden fixed inset-0 bg-black bg-opacity-50 items-center justify-center z-50"
            >
                <div className="bg-white rounded-lg w-full max-w-lg mx-4">
                    <div className="flex justify-between items-center p-6 border-b">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Add New Achievement
                        </h3>
                        <button
                            id="closeAchievementModal"
                            onClick={handleModalActive}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <div className="w-6 h-6 flex items-center justify-center">
                                <i className="ri-close-line ri-lg" />
                            </div>
                        </button>
                    </div>
                    <form id="achievementForm" className="p-6">
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="achievementTitle"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Achievement Title
                                </label>
                                <input
                                    type="text"
                                    id="achievementTitle"
                                    value={achievementTitle}
                                    onChange={(e) => setAchievementTitle(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="achievementDescription"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="achievementDescription"
                                    rows={4}
                                    value={achievementDescription}
                                    onChange={(e) => setAchievementDescription(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                id="cancelAchievement"
                                onClick={handleModalActive}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleAddAchievement}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-600/90"
                            >
                                Save Achievement
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
}
