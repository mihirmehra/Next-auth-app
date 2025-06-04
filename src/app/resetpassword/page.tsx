"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from 'react';

export default function ResetPasswordPage() {
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const resetUserPassword = async () => {
        setLoading(true);
        setError(""); // Reset error state before making the request
        // Validate token and password
        if (!token) {
            setError("Token is required.");
            setLoading(false);
            return;
        }
        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }

        try {
            await axios.post("/api/users/resetpassword", { token, newPassword });
            setSuccess(true);
        } catch (error: any) {
            console.error("Error resetting password:", error); // Log the error for debugging
            setError(error.response?.data?.error || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        if (urlToken && urlToken.length > 0) {
            setToken(urlToken || "");
        } else {
            setError("Invalid token provided.");
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                    <div className="text-center mb-8">
                    <h1 className="mb-5 text-4xl">Reset Your Password</h1>
                    <h2 className="bg-green-600 text-white rounded p-5 py-1 mt-3 hidden">{token ? `${token}` : "No token provided"}</h2>
                    <p className="text-gray-500 mt-2">{loading ? "Please Wait..." : "create a new password"} </p>
                    </div>
                    <form className="space-y-6">
                    <div>
                            <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                            </label>
                            <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                                <i className="ri-lock-line" />
                                </div>
                            </div>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={loading} // Disable input while loading
                                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
                                placeholder="Enter New Password" />
                            </div>
                    </div>
                    <button
                        onClick={resetUserPassword}
                        disabled={loading} // Disable button while loading
                        className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-600/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-600">
                        {success && (
                            <div className="my-5 text-center">
                                <p className="text-green-600">Your password has been reset successfully!</p>
                                <Link href="/login" className="bg-blue-600 text-white rounded p-5 py-1 mt-3">Go to Login</Link>
                            </div>
                        )}

                        {error && (
                            <div className="my-5 text-center">
                                <p className="text-red-600">{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
