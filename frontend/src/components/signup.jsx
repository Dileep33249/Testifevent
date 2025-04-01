import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);

      if (response.status === 201) {
        alert('User Registered Successfully!');
        navigate('/login');  // Redirect to login page after successful signup
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Something went wrong');
    } finally {
      setLoading(false);
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
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-green-500 hover:text-green-700">Login</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
