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
    phoneNumber: "",
    location: "",
    dateOfBirth: "",
    nationality: "",
    languages: "",
    currentPosition: "",
    workExperience: "",
    education: "",
    skills: "",
    bio: "",
    aboutYou: "",
    professionalGoals: "",
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
    // Password toggle functionality
    const passwordInput:any = document.getElementById('password');
    const toggleButton:any = document.querySelector('.toggle-password');
    if (toggleButton) {
      toggleButton.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon:any = toggleButton.querySelector('i');
        icon.classList.toggle('ri-eye-off-line');
        icon.classList.toggle('ri-eye-line');
      });
    }

    // Password strength functionality
    const strengthBar:any = document.querySelector('.password-strength');
    const strengthText:any = document.querySelector('.password-strength-text');
    passwordInput.addEventListener('input',  () => {
      const password = passwordInput.value;
      let strength = 0;
      if (password.length >= 8) strength += 1;
      if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
      if (password.match(/\d/)) strength += 1;
      if (password.match(/[^a-zA-Z\d]/)) strength += 1;

      switch (strength) {
        case 0:
          strengthBar.style.width = '0%';
          strengthBar.className = 'password-strength bg-red-500 h-1 rounded-4xl'; 
          strengthText.textContent = 'Weak';
          strengthText.className = 'text-xs font-medium text-gray-500';
          break;
        case 1:
          strengthBar.style.width = '25%';
          strengthBar.className = 'password-strength bg-red-500 h-1 rounded-4xl'; 
          strengthText.textContent = 'Weak';
          strengthText.className = 'text-xs font-medium text-red-500';
          break;
        case 2:
          strengthBar.style.width = '50%';
          strengthBar.className = 'password-strength bg-yellow-500 h-1 rounded-4xl'; 
          strengthText.textContent = 'Fair';
          strengthText.className = 'text-xs font-medium text-yellow-500';
          break;
        case 3:
          strengthBar.style.width = '75%';
          strengthBar.className = 'password-strength bg-green-500 h-1 rounded-4xl'; 
          strengthText.textContent = 'Good';
          strengthText.className = 'text-xs font-medium text-green-500';
          break;
        case 4:
          strengthBar.style.width = '100%';
          strengthBar.className = 'password-strength bg-green-500 h-1 rounded-4xl'; 
          strengthText.textContent = 'Strong';
          strengthText.className = 'text-xs font-medium text-green-500';
          break;
      }
    });

    // Cleanup event listeners on component unmount
    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener('click', toggleButton);
      }
      passwordInput.removeEventListener('input', passwordInput);
    };
  }, []);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="font-['Pacifico'] text-3xl text-gray-800">Next Auth</h1>
            <h2 className="text-2xl font-bold text-gray-800 mt-6">
              {loading ? "Processing" : "Create your account"} 
            </h2>
            <p className="text-gray-500 mt-2">Join thousands of users worldwide</p>
          </div>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                    <i className="ri-user-line" />
                  </div>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded text-gray-900 placeholder-gray-400"
                  placeholder="Username"
                />
              </div>
            </div>
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
                  placeholder="Create a password"/>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="w-5 h-5 flex items-center justify-center text-gray-400 toggle-password cursor-pointer">
                    <i className="ri-eye-line" />
                  </div>
                </div>
              </div>
              <div className="mt-1.5">
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-200 rounded-4xl h-1 mr-2">
                    <div
                      className="password-strength bg-red-500 h-1 rounded-4xl"
                      style={{ width: "0%" }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 password-strength-text">
                    Weak
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Use 8+ characters with a mix of letters, numbers &amp; symbols
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <div className="relative">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="opacity-0 absolute h-5 w-5 cursor-pointer"/>
                  <div className="border border-gray-300 rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary">
                    <svg
                      className="fill-current hidden w-3 h-3 text-gray-900 pointer-events-none"
                      viewBox="0 0 20 20">
                      <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the
                  {" "}
                  <a href="#" className="text-gray-900 hover:text-gray-900/80 text-sm">
                    Terms of Service 
                  </a>
                  {" "}
                  and
                  {" "}
                  <a href="#" className="text-gray-900 hover:text-gray-900/80 text-sm">
                     Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-600/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary whitespace-nowrap"
              onClick={onSigup}>
                {buttonDisabled ? "Fill The Feilds" : "Create Account"}
            </button>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                className="social-btn w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-google-fill text-[#4285F4]" />
                </div>
                Google
              </button>
              <button
                type="button"
                className="social-btn w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-facebook-fill text-[#1877F2]" />
                </div>
                Facebook
              </button>
              <button
                type="button"
                className="social-btn w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-apple-fill" />
                </div>
                Apple
              </button>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-800 hover:text-gray-900/80">
              Login
            </Link>
          </p>
        </div>
      </div>
  )
}
