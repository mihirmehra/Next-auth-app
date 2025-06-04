"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
      
      const userId = await res.data.user.username;
      router.push(`/profile/${userId}`);

    } catch (error: any) {
      console.log("Error doing login", error.message);
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
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="font-['Pacifico'] text-3xl text-gray-800">Next Auth</h1>
          <h2 className="text-2xl font-bold text-gray-800 mt-6">
            {loading ? "Processing" : "Login"}
          </h2>
          <p className="text-gray-500 mt-2">{loading ? "Please Wait..." : "Welcome Back"} </p>
        </div>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-mail-line" />
                </div>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-lock-line" />
                </div>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
                placeholder="Create a password" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-600/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap"
            onClick={onLogin}>
            {buttonDisabled ? "Login" : "Fill The Feilds"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          <Link href="/forgotpassword" className="font-medium text-blue-800 hover:text-gray-900/80">
            Forgot Password ?
          </Link>
        </p>
        <hr />
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="font-medium text-blue-800 hover:text-gray-900/80">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}
