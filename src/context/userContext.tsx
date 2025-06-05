"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface UserContextType {
    userEmail: string | null;
    setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userEmail, setUserEmail] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
