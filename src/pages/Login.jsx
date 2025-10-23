import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employeeId, name, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (employeeId) {
      console.log(`Login successful for ${name} (ID: ${employeeId}), redirecting to /home`);
      navigate("/home");
    }
  }, [employeeId, name, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Dispatching loginUser thunk with:", { email, password });
    dispatch(loginUser({ email, password }));
  };

  return (
    <div
  className="flex items-center justify-center min-h-screen px-4 bg-cover bg-top bg-no-repeat"
  style={{
    backgroundImage:
      "url('https://media.licdn.com/dms/image/v2/D4E22AQGMnI0cIAqcdw/feedshare-shrink_2048_1536/B4EZmqIDkPIQAw-/0/1759495864110?e=1762992000&v=beta&t=SrjbbuBu0oUqTKqIAqbvA_LQVe5OVtxFUrM_Z4cdE0M')",
  }}
>
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6 transform transition-all hover:scale-[1.02] duration-300">
        {/* Company Logo */}
        <div className="flex justify-center">
          <img
            src="https://www.abstract-group.com/hubfs/Abstract%20Group%20Logo%20Layout%202.png"
            alt="Company Logo"
            className="h-16 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-[#3C467B]">HRMS Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#50589C] font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6E8CFB]"
            />
          </div>

          <div>
            <label className="block text-[#50589C] font-semibold mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6E8CFB]"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {loading && <p className="text-blue-500 text-sm text-center">Logging in...</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#636CCB] hover:bg-[#6E8CFB] text-white font-semibold py-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
