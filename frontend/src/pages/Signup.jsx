import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../api/client";

function Signup() {
  const [username, setUsername] = useState("");  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient.post("/auth/create", {
        username,
        password,
      });
      alert(res.data.message);      
      navigate("/"); 
      
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white py-6 px-6 rounded-sm shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Signup
        </h2>

        <input
          type="text"
          name="username"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
        
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
         value={password}
              onChange={(e)=>setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
              type="submit"
              disabled={loading}
          className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Creating account..." : "Signup"}
        </button>
        <p>Have an Account?</p>

        <Link to="/" className="text-blue-600 font-medium">
          Login
        </Link>
      </form>
    </div>
  );
}

export default Signup;
