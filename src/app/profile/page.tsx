"use client"

import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useState } from "react";
import toast from "react-hot-toast";


export default function ProfilePage() {
    
    const router = useRouter();
    const [data, setData] = useState("nothing")

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successfully");
            router.push("/login");

        } catch (error: any){
            toast.error("there was an error logging out", error.message);
            console.log(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/user');
            console.log(res.data);
            setData(res.data.data);
        } catch (error:any) {
            toast.error("Failed to fetch user details: " + error.message);
            console.log(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr/>
            <div className="my-5 text-center">
                <p>profile page</p>
                <h2>{data === "nothing" ? "Nothing in the data" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
                <button onClick={getUserDetails} className="bg-blue-600 text-white rounded-2xl p-5 py-1 mt-3">get data</button>
            </div>
            <button onClick={logout} className="bg-red-600 text-white rounded-2xl p-5 py-1">Logout</button>
       </div>
    )
}