import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/userroutes/login', { email, password },{
        withCredentials: true,
      });
      if(response.status){
            alert(response.data.message)
      }
      console.log(response.data);


    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong');
      console.error(err);
    } finally {
      setLoading(false);
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
          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 outline-none"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Don’t have an account? 
            <a href="/" className="text-green-500 hover:text-green-700">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
