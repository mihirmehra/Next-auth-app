"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from 'react'


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {

        try{
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);

        } catch (error:any) {
            setError(true);
            console.log(error.response.data)
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-5 text-4xl">verify your email</h1>
            <h2 className="bg-green-600 text-white rounded p-5 py-1 mt-3">{token ? `${token}` : "no token"}</h2>

            { verified && (
                <div className="my-5 text-center">
                    <p className="text-green-600">Your email has been verified successfully!</p>
                    <Link href="/login" className="bg-blue-600 text-white rounded p-5 py-1 mt-3">Go to Login</Link>
                </div>
            )}

            { error && (
                <div className="my-5 text-center">
                    <p className="text-red-600">There was an error verifying your email. Please try again.</p>
                </div>
            )}

        </div>
    )
}
