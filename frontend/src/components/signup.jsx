import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put('http://localhost:4000/userroutes/signup', formData,{
        withCredentials:true
      });
      if(response.status){
        alert(response.data.message);
        navigate('/login');

      }
      console.log(response.data);
      setLoading(false);
      // Handle success (e.g., redirect to login page or show success message)
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data.message : 'Something went wrong');
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Sign Up</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
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
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Role Input */}
          <div>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="" disabled>Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account? 
            <a href="/login" className="text-green-500 hover:text-green-700">Login</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
