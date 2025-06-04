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
            <h1 className="mb-5 text-4xl">Reset Your Password</h1>
            <h2 className="bg-green-600 text-white rounded p-5 py-1 mt-3">{token ? `${token}` : "No token provided"}</h2>

            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-3 p-2 border rounded"
                disabled={loading} // Disable input while loading
            />

            <button
                onClick={resetUserPassword}
                disabled={loading} // Disable button while loading
                className={`bg-blue-600 text-white rounded p-5 py-1 mt-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loading ? "Resetting..." : "Reset Password"}
            </button>

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
    );
}
