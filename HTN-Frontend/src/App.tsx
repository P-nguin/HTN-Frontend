import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import LandingPage from './components/LandingPage';
import Dashboard from './components/DashBoard';
import EventData from './types/EventData';

const FullWidthContainer = styled.div`
    display: flex; // Use flexbox for layout
    flex-direction: column; // Stack children vertically
    align-items: center; // Center children horizontally
    width: 100%; // Full width
    min-height: 100vh; // Minimum height to fill the screen
    box-sizing: border-box; // Include padding and border in the element's size
    margin: 0 auto; // Auto margins for centering
    padding: 0 1rem; // Padding on the sides
`;

const CenteredContent = styled.div`
    max-width: 1200px; /* Set a max-width for the centered content */
    margin: 0 auto; /* Center the content */
    padding: 0 1rem; /* Add padding on the sides */
`;

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
            <FullWidthContainer>
                <CenteredContent>
                    <Routes>
                        <Route path="/" element={<LandingPage events={events} />} />
                        <Route path="/dashboard" element={<Dashboard events={events} />} />
                    </Routes>
                </CenteredContent>
            </FullWidthContainer>
        </BrowserRouter>
    );
}

export default App
