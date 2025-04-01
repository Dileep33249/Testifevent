import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/CreateEvent';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* Set the Signup page to be the default route */}
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
