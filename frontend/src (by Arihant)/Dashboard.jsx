import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <h2>Welcome to the Admin Dashboard!</h2>
                <p>Here you can manage your events and users efficiently.</p>
            </div>
        </div>
    );
}

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to="/">Dashboard Home</Link>
            <Link to="/create-event">Create a New Event +</Link>
            <Link to="/manage-events">Manage Events</Link>
            <Link to="/user-management">User Management</Link>
            <Link to="/settings">Settings</Link>
        </div>
    );
}

export default Dashboard;
