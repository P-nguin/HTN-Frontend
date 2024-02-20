import React, { useEffect, useState } from 'react';
import EventData from '../types/EventData';
import EventList from './EventList';
import UpcomingEvents from './UpcomingEvents';
import { styled } from 'styled-components';
import { theme } from '../styles/theme';

const DashboardContainer = styled.div`
    width: 60vw;
    border-radius: 10px;
    background: ${theme.background};
`;

const WelcomeMessage = styled.h1`
    color: ${theme.primary};
    padding-top: 20px;
`;

interface DashboardProps {
    events: EventData[];
}

const Dashboard: React.FC<DashboardProps> = ({events}) => {
    const [userName, setUsername] = useState('');

    useEffect(() => {
      const savedUsername = localStorage.getItem('username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }, []);

    return (
        <DashboardContainer>
            <WelcomeMessage>Welcome {userName}</WelcomeMessage>
            <UpcomingEvents events={events} />
            <EventList events={events} isLoggedIn={true} />
        </DashboardContainer>
    );
};

export default Dashboard;
