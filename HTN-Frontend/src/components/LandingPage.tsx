import React, { useState } from 'react';
import styled from 'styled-components';

import { theme } from '../styles/theme';

import LoginForm from './LoginForm';
import EventList from './EventList';
import EventData from '../types/EventData';

// Interface to define props for the LandingPage component
interface LandingPageProps {
    events: EventData[];
}

// Styled component for the welcome message
const WelcomeMessage = styled.h1`
    color: ${theme.textPrimary};
    margin-bottom: 24px;
`;

// Styled component for the container of the LandingPage component
const LandingPageContainer = styled.div`
    width: 60vw;
    padding: 15px;
    border-radius: 5px;
    background-color: ${theme.background};
`;

// Functional component definition for LandingPage
const LandingPage: React.FC<LandingPageProps> = ({events}) => {
    // State to track whether the user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Handler function to be called on successful login
    const handleLoginSuccess = () => {
        setIsLoggedIn(true); // Update state to reflect the user is logged in
    };

    // Handler function to be called on login failure
    const handleLoginFailure = () => {
        setIsLoggedIn(false); // Update state to reflect the user is not logged in
    }

    // Render method for the component
    return (
        <LandingPageContainer>
            <WelcomeMessage>Hack The North</WelcomeMessage> {/* Displaying the welcome message */}
            {/* Conditionally rendering the LoginForm component if the user is not logged in */}
            {!isLoggedIn && <LoginForm handleLoginSuccess={handleLoginSuccess} handleLoginFailure={handleLoginFailure} />}
            {/* Rendering the EventList component with the events prop and isLoggedIn state */}
            <EventList events={events} isLoggedIn={isLoggedIn}></EventList>
        </LandingPageContainer>
    );
};

export default LandingPage;
