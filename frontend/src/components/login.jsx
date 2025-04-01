import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect to dashboard if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/dashboard"); // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission until checks are done
    setLoading(true);
    setError(null);

    // Validate inputs
    if (!email || !password) {
      setError("Please fill out both fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Store the token and user data
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to dashboard after successful login
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle API errors
      setError(err.response ? err.response.data.message : "Something went wrong");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 p-3 bg-green-500 text-white font-semibold rounded-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-500 hover:text-green-700">
              Sign up
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
