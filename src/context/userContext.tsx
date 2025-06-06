"use client"

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface UserContextType {
    userEmail: string | null;
    setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
    logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userEmail, setUserEmail] = useState<string | null>(null);

    // Function to check if running in the browser
    const isBrowser = typeof window !== 'undefined';

    useEffect(() => {
        if (isBrowser) {
            const storedEmail = localStorage.getItem('userEmail');
            if (storedEmail) {
                setUserEmail(storedEmail);
            }
        }
    }, []);

    const getUserDetails = async () => {
        if (!userEmail) return;

        try {
            const res = await axios.get('/api/users/user');
            const email = res.data.data.email;
            setUserEmail(email);
            if (isBrowser) {
                localStorage.setItem('userEmail', email);
            }
        } catch (error: any) {
            toast.error("Failed to fetch user details: " + error.message);
            console.log(error.message);
        }
    };

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successfully");
            setUserEmail(null);
            if (isBrowser) {
                localStorage.removeItem('userEmail');
            }
        } catch (error: any) {
            toast.error("There was an error logging out: " + error.message);
            console.log(error.message);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, [userEmail]); 

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

