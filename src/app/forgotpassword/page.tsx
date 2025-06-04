"use client"

import axios from 'axios';
import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/forgotpassword', { email });
            setMessage('Check your email for a password reset link.');
        } catch (error) {
            setMessage('Error sending reset email.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button type="submit">Send Reset Link</button>
            {message && <p>{message}</p>}
        </form>
    );
}
