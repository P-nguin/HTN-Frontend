import React, { useState } from 'react';
import styled from 'styled-components';

import { theme } from '../styles/theme';

import LoginForm from './LoginForm';
import EventList from './EventList';
import EventData from '../types/EventData';

interface LandingPageProps {
    events: EventData[];
}

const WelcomeMessage = styled.h1`
    color: ${theme.accent};
    margin-bottom: 24px;
`;

const LandingPage: React.FC<LandingPageProps> = ({events}) => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLoginFailure = () => {
        setIsLoggedIn(false);
    }

    return (
        <div>
            <WelcomeMessage>Hack The North</WelcomeMessage>
            {!isLoggedIn && <LoginForm onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />}
            <EventList events={events}></EventList>
        </div>
    );
};

export default LandingPage;
