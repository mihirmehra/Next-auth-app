"use client"

import User from '@/models/userModel';
import axios from 'axios';
import { set } from 'mongoose';
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/forgotpassword', { email });
            setSuccess(true);
        } catch (error: any) {
            setError(error.response?.data?.error || "Error sending reset email.");
        }
    };

    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
                    <div className="text-center mb-8">
                        <h1 className="mb-5 text-4xl">Forgot Password</h1>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Your Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                                        <i className="ri-lock-line" />
                                    </div>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
                                    required
                                />
                            </div>
                            <button
                                type='submit'
                                className={`w-full mt-5 flex justify-center py-2.5 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-600/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap`}
                            >
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                    <div>
                        {success && (
                            <div className="my-5 text-center">
                                <p className="text-green-600">Check your email for a password reset link.</p>
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
