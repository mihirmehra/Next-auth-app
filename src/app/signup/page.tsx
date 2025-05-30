"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast/headless";
import axios from "axios";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
      email: "",
      password: "",
      username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSigup = async (event: any) => {
      event.preventDefault(); 

      try {

        setLoading(true);
        const res = await axios.post("/api/users/signup", user);
        console.log("signup success", res.data);
        router.push("/login");

      } catch (error: any) {

        console.error("Error during signup:", error.message);
        toast.error(error.message);

      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false);
      }
      else {
        setButtonDisabled(true)
      }
    },[user]);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="mb-5 text-4xl">{loading ? "" : "Signup"}</h1>
          <hr />
          <form>
            <div className="mb-5 flex">
              <label className="flex items-center w-30" htmlFor="username">Username</label>
              <input className="p-2 bg-white text-black w-70 rounded-2xl" id="username" type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} placeholder="Username"/>
            </div>
            <div className="mb-5 flex">
              <label className="flex items-center w-30" htmlFor="email">Email</label>
              <input className="p-2 bg-white text-black w-70 rounded-2xl" id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Email"/>
            </div>
            <div className="mb-5 flex">
              <label className="flex items-center w-30" htmlFor="password">Password</label>
              <input className="p-2 bg-white text-black w-70 rounded-2xl" id="password" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Password"/>
            </div>
            <button className="w-100 bg-purple-800 p-2 rounded-2xl cursor-pointer" type="submit" onClick={onSigup}>{buttonDisabled ? "No signup" : "Signup"}</button>
          </form>
          <Link href="/login">Visit Login page</Link>
      </div>
    )
  }
  