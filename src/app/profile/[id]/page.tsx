"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function UserProfile() {

    interface UserData {
        email: string;
        username: string;
    }

    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("personal");

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/user');
            console.log(res.data)
            console.log(res.data.data)
            setData(res.data.data);
        } catch (error:any) {
            toast.error("Failed to fetch user details: " + error.message);
            console.log(error.message);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    const email = loading ? "Loading..." : data?.email || "Email not available";
    const username = loading ? "Loading..." : data?.username || "Email not available";

    // Function to handle tab switching
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
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
                        {username}
                    </h1>
                    <p className="text-gray-600 text-center max-w-md mb-6">
                        Product Designer &amp; UX Specialist with 6+ years of experience
                        creating intuitive digital experiences for global brands.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-2">
                        <div className="flex items-center gap-2 text-gray-700">
                            <div className="w-5 h-5 flex items-center justify-center text-primary">
                                <i className="ri-mail-line" />
                            </div>
                            <span>{email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <div className="w-5 h-5 flex items-center justify-center text-primary">
                                <i className="ri-phone-line" />
                            </div>
                            <span>+1 (415) 555-0123</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                            <div className="w-5 h-5 flex items-center justify-center text-primary">
                                <i className="ri-map-pin-line" />
                            </div>
                            <span>San Francisco, CA</span>
                        </div>
                    </div>
                </div>
                {/* Tab Navigation */}
                <div className="border-b border-gray-200 mb-6">
                    <div className="flex space-x-8">
                        <button
                            className={`tab-button py-3 px-1 border-b-2 ${activeTab === "personal" ? "border-primary text-primary" : "border-transparent text-gray-500"} font-medium`}
                            onClick={() => handleTabClick("personal")}
                            data-tab="personal"
                        >
                            Personal Details
                        </button>
                        <button
                            className={`tab-button py-3 px-1 border-b-2 ${activeTab === "achievements" ? "border-primary text-primary" : "border-transparent text-gray-500"} font-medium`}
                            onClick={() => handleTabClick("achievements")}
                            data-tab="achievements"
                        >
                            Achievements
                        </button>
                        <button
                            className={`tab-button py-3 px-1 border-b-2 ${activeTab === "social" ? "border-primary text-primary" : "border-transparent text-gray-500"} font-medium`}
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
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Full Name</div>
                                    <div className="text-gray-800">Alexandra Marie Richardson</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">
                                        Date of Birth
                                    </div>
                                    <div className="text-gray-800">March 15, 1989</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Nationality</div>
                                    <div className="text-gray-800">American</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Languages</div>
                                    <div className="text-gray-800">
                                        English (Native), Spanish (Fluent), French (Basic)
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">
                                        Current Position
                                    </div>
                                    <div className="text-gray-800">
                                        Senior Product Designer at InnovateTech
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">
                                        Work Experience
                                    </div>
                                    <div className="text-gray-800">6+ years</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Education</div>
                                    <div className="text-gray-800">
                                        M.A. Human-Computer Interaction, Stanford University
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">Skills</div>
                                    <div className="text-gray-800">
                                        UX/UI Design, User Research, Prototyping, Design Systems
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 space-y-4">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">About Me</div>
                                    <div className="text-gray-800">
                                        <p>
                                            I'm a passionate product designer focused on creating
                                            human-centered digital experiences that solve real problems.
                                            With a background in both design and psychology, I bring a
                                            unique perspective to understanding user needs and translating
                                            them into intuitive interfaces.
                                        </p>
                                        <p className="mt-2">
                                            When I'm not designing, you can find me hiking in the mountains,
                                            experimenting with new cooking recipes, or mentoring aspiring
                                            designers through online communities.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-sm font-medium text-gray-500">
                                        Professional Goals
                                    </div>
                                    <div className="text-gray-800">
                                        <p>
                                            I aim to lead design teams that create products with meaningful
                                            impact, while continuing to advocate for accessible and
                                            inclusive design practices across the industry.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "achievements" && (
                        <div id="achievements" className="tab-content">
                            <div className="space-y-6">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-gray-900">
                                            Design Innovation Award
                                        </h3>
                                        <span className="text-sm text-gray-500">2024</span>
                                    </div>
                                    <p className="text-gray-700">
                                        Received industry recognition for pioneering a new approach to
                                        financial app interfaces that increased user engagement by 42%.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-gray-900">
                                            Published Research Paper
                                        </h3>
                                        <span className="text-sm text-gray-500">2023</span>
                                    </div>
                                    <p className="text-gray-700">
                                        Co-authored "Designing for Cognitive Accessibility" in the Journal
                                        of Human-Computer Interaction, cited by over 200 researchers.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-gray-900">
                                            Speaker at UX Conference
                                        </h3>
                                        <span className="text-sm text-gray-500">2022</span>
                                    </div>
                                    <p className="text-gray-700">
                                        Delivered keynote presentation on "The Future of Inclusive Design"
                                        at the International UX Design Summit in Berlin.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-gray-900">Design Patent</h3>
                                        <span className="text-sm text-gray-500">2021</span>
                                    </div>
                                    <p className="text-gray-700">
                                        Secured patent for innovative navigation system designed for users
                                        with motor impairments, now implemented in multiple healthcare
                                        applications.
                                    </p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium text-gray-900">
                                            Team Leadership Award
                                        </h3>
                                        <span className="text-sm text-gray-500">2020</span>
                                    </div>
                                    <p className="text-gray-700">
                                        Recognized for exceptional leadership in guiding cross-functional
                                        team through complete redesign of company's flagship product.
                                    </p>
                                </div>
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
                                        className="px-6 py-2 bg-primary text-white font-medium rounded-button hover:bg-primary/90 transition-colors whitespace-nowrap"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
