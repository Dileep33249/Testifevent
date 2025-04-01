import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setEvents(data.events); // Assuming the response contains an array of events
        } else {
          console.error('Failed to fetch events', data);
          setError(data.message || 'Failed to load events'); // Display an error if API request fails
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Something went wrong while fetching events.');
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Navigation Bar */}
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

      {/* Main Content */}
      <div className="flex">
        <Sidebar />
        <div className="main-content p-6 w-full">
          <h2 className="text-2xl font-bold">Welcome to the Dashboard, {user.name || 'User'}!</h2>
          <p>Here you can manage your account and settings.</p>

          <div className="events-section mt-6">
            <h3 className="text-xl font-semibold mb-4">Your Events</h3>

            {/* Display error if there's an issue fetching events */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-600 rounded-md">
                {error}
              </div>
            )}

            {events.length === 0 ? (
              <p>You have no events yet. <Link to="/create-event" className="text-blue-500">Create one now</Link>!</p>
            ) : (
              <div className="event-list">
                {events.map(event => (
                  <div key={event._id} className="event-card bg-white p-4 rounded-lg shadow-md mb-4">
                    <h4 className="text-lg font-bold">{event.eventName}</h4>
                    <p>{new Date(event.dateTime).toLocaleString()}</p> {/* Format the date */}
                    <p>{event.venue}</p>
                    <p>{event.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="sidebar bg-gray-800 text-white w-64 h-screen p-4">
    <Link to="/dashboard" className="block p-3 mt-2 bg-green-500 text-white rounded-md">
      Dashboard Home
    </Link>
    <Link to="/create-event" className="block p-3 mt-2 bg-green-500 text-white rounded-md">
      Create a New Event +
    </Link>
    <Link to="/manage-events" className="block p-3 mt-2 bg-green-500 text-white rounded-md">
      Manage Events
    </Link>
    <Link to="/settings" className="block p-3 mt-2 bg-green-500 text-white rounded-md">
      Settings
    </Link>
  </div>
);

export default Dashboard;
