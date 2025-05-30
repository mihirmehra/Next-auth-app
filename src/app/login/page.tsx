"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast/headless";
import axios from "axios";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
      email: "",
      password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async (event: any) => {
      event.preventDefault();

      try {
        setLoading(true);
        const res = await axios.post("/api/users/login", user);
        console.log("Login success", res.data);
        toast.success("Login successfull");
        router.push("/profile");

      } catch (error: any) {
        console.log("Error doing login",error.message);
        toast.error(error.message);
        setLoading(false);

      } finally {
        setLoading(false);
      }
        
    }

    useEffect(() => {
      if (user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }, [user]);


    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="mb-5 text-4xl">{loading ? "Processing" : "Login"}</h1>
          <hr />
          <form>
            <div className="mb-5 flex">
              <label className="flex items-center w-30" htmlFor="email">Email</label>
              <input className="p-2 bg-white text-black w-70 rounded-2xl" id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} placeholder="Email"/>
            </div>
            <div className="mb-5 flex">
              <label className="flex items-center w-30" htmlFor="password">Password</label>
              <input className="p-2 bg-white text-black w-70 rounded-2xl" id="password" type="password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} placeholder="Password"/>
            </div>
            <button className="w-100 bg-blue-800 p-2 rounded-2xl cursor-pointer" type="submit" onClick={onLogin}>{buttonDisabled ? "Submit" : "No Submit"}</button>
          </form>
          <Link href="/signup">Visit Signup page</Link>
      </div>
    ) 
  }
  