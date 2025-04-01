import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function CreateEvent() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formattedDate, setFormattedDate] = useState("");
  const navigate = useNavigate();

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString(undefined, options);
  };

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve the JWT token from localStorage

      if (!token) {
        alert('You are not logged in!');
        return; // Exit if token is not found
      }

      const response = await fetch('http://localhost:5000/api/create-events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: data.eventName,
          dateTime: new Date(data.dateTime).toISOString(), 
          venue: data.venue,
          description: data.description,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Event created successfully!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        alert('Failed to create event');
        console.error(result);
      }
    } catch (error) {
      console.error('Error while creating event:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="create-event w-full min-h-screen flex flex-col">
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-green-500">MyApp</Link>
          <div className="space-x-4">
            <Link to="/profile" className="text-lg text-gray-700 hover:text-green-500">Profile</Link>
            <Link to="/about" className="text-lg text-gray-700 hover:text-green-500">About</Link>
            <Link to="/contact" className="text-lg text-gray-700 hover:text-green-500">Contact</Link>
            {!localStorage.getItem('authToken') ? (
              <>
                <Link to="/login" className="text-lg text-gray-700 hover:text-green-500">Login</Link>
                <Link to="/signup" className="text-lg text-gray-700 hover:text-green-500">Sign Up</Link>
              </>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('user');
                  window.location.href = '/login'; // Redirect to login page after logout
                }}
                className="text-lg text-gray-700 hover:text-green-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center w-full py-8 bg-[#f5dcc5]">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-black mb-6 text-center">Create a New Event</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-3/5 max-w-4xl min-h-[60vh] mx-auto">
            <div className="flex space-x-6 mb-6">
              <div className="w-1/2">
                <label className="block text-xl font-bold mb-2">Event Name:</label>
                <input 
                  type="text" 
                  className="w-full p-3 border-2 border-[#38f308] rounded-lg"
                  {...register('eventName', { required: { value: true, message: "*Event Name is required" } })} 
                />
                {errors.eventName && <span className="text-red-500 text-sm">{errors.eventName.message}</span>}
              </div>

              <div className="w-1/2">
                <label className="block text-xl font-bold mb-2">Date & Time:</label>
                <input 
                  type="datetime-local" 
                  className="w-full p-3 border-2 border-[#38f308] rounded-lg"
                  {...register('dateTime', { required: { value: true, message: "*Date & Time are required" } })} 
                />
                {errors.dateTime && <span className="text-red-500 text-sm">{errors.dateTime.message}</span>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xl font-bold mb-2">Venue:</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-[#38f308] rounded-lg"
                {...register('venue', { required: { value: true, message: "*Venue is required" } })} 
              />
              {errors.venue && <span className="text-red-500 text-sm">{errors.venue.message}</span>}
            </div>

            <div className="mb-6">
              <label className="block text-xl font-bold mb-2">Description:</label>
              <textarea 
                className="w-full p-3 border-2 border-[#38f308] rounded-lg resize-y h-32"
                {...register('description', { required: { value: true, message: "*Description is required" } })} 
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <button 
              type="submit" 
              className="w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-500 focus:outline-none transition duration-300"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
