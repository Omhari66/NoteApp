import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/ContextProvider"; 
import {toast} from "react-toastify";

const Login = () => {
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const {login}=useAuth();
   const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response= await axios.post("http://localhost:5000/api/auth/login" ,{email,password});
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token",response.data.token)
                navigate("/")
            }else{
                 toast.error(response.data.message||"Invalid credentials!");
            }
        }
        catch(error){
         
            console.log(error);
             toast.error(
      error.response?.data?.message || "Login failed! Credentials not matched."
    );

        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
         

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline font-medium">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;  