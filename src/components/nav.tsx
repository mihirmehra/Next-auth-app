"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from '@/context/userContext'; 

const Nav = () => {
    const router = useRouter();
    const { userEmail, logout } = useUser(); 

    const handleLogout = async () => {
        await logout(); 
        router.push("/login"); 
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="font-['Pacifico'] text-2xl text-gray-800">
                            Next Auth
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        {userEmail ? (
                            <>
                                <span className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                                    {userEmail}
                                </span>
                                <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Login
                                </Link>
                                <Link href="/signup" className="bg-blue-600 text-white hover:bg-blue-600/90 px-4 py-2 rounded text-sm font-medium whitespace-nowrap">
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
