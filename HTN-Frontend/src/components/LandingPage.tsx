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
    color: ${theme.textPrimary};
    margin-bottom: 24px;
`;

const LandingPageContainer = styled.div`
    width: 60vw;
    padding: 15px;
    border-radius: 5px;
    background-color: ${theme.background};
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
        <LandingPageContainer>
            <WelcomeMessage>Hack The North</WelcomeMessage>
            {!isLoggedIn && <LoginForm handleLoginSuccess={handleLoginSuccess} handleLoginFailure={handleLoginFailure} />}
            <EventList events={events} isLoggedIn={false}></EventList>
        </LandingPageContainer>
    );
};

export default LandingPage;
