import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Dashboard from './Dashboard';
import CreateEvent from './CreateEvent';

function App() {
    return (
        <Routes>
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
