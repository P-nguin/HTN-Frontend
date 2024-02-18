import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import LandingPage from './components/LandingPage';
import Dashboard from './components/DashBoard';
import EventData from './types/EventData';

function App() {
    const [events, setEvents] = useState<EventData[]>([]);

    useEffect(() => {
        fetch('https://api.hackthenorth.com/v3/events')
        .then((response) => response.json())
        .then((data) => {
            const sortedEvents = data.sort((a: EventData, b: EventData) => a.start_time - b.start_time);
            setEvents(sortedEvents);
        })
        .catch((error) => console.error("Error fetching events:", error));
    }, []);

    return (
        <BrowserRouter>
                <Routes>
                <Route path="/" element={<LandingPage events={events}/>} />
                <Route path="/dashboard" element={<Dashboard events={events}/>} />
                </Routes>
        </BrowserRouter>
    );
}

export default App
