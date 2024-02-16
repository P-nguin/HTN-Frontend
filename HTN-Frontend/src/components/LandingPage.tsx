import React, { useState } from 'react';
import styled from 'styled-components';

import { theme } from '../styles/theme';

import LoginForm from './LoginForm';

const WelcomeMessage = styled.h1`
    color: ${theme.accent};
    margin-bottom: 24px;
`;

export const LandingPage = () => {
    
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
        </div>
    );
};