import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import EventData from '../types/EventData';
import EventList from './EventList';
import UpcomingEvents from './UpcomingEvents';

// DashboardContainer styled component for main dashboard styling
const DashboardContainer = styled.div`
    width: 60vw; // Set the width to 60% of the viewport width
    border-radius: 10px; // Rounded corners for the container
    background: ${theme.background}; // Background color from the theme
`;

// WelcomeMessage styled component for the welcome message
const WelcomeMessage = styled.h1`
    color: ${theme.primary}; // Text color from the theme
    padding-top: 20px; // Top padding for the welcome message
`;

// Interface to type the props expected by the Dashboard component
interface DashboardProps {
    events: EventData[]; // Array of events of type EventData
}

// Dashboard functional component definition using React.FC with DashboardProps
const Dashboard: React.FC<DashboardProps> = ({ events }) => {
    const [userName, setUsername] = useState<string>(''); // State to store the user's name

    // useEffect hook to fetch the username from localStorage when the component mounts
    useEffect(() => {
        const savedUsername = localStorage.getItem('username'); // Attempt to retrieve the username
        if (savedUsername) {
            setUsername(savedUsername); // Set the username if it was found
        }
    }, []); // Empty dependency array means this effect runs once on mount

    // Render method for the Dashboard component
    return (
        <DashboardContainer>
            <WelcomeMessage>Welcome {userName}</WelcomeMessage> {/* Display the welcome message */}
            <UpcomingEvents events={events} /> {/* Component to display upcoming events */}
            <EventList events={events} isLoggedIn={true} /> {/* Component to list all events, assuming user is logged in */}
        </DashboardContainer>
    );
};

export default Dashboard; // Export the Dashboard component for use in other parts of the app
