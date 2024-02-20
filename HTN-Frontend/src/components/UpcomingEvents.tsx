import React from 'react';
import EventData from '../types/EventData';
import UpcomingEventCard from './UpcomingEventCard'; // Assume this is your card component
import { styled } from 'styled-components';
import { theme } from '../styles/theme';

interface UpcomingEventsProps {
  events: EventData[];
}

const UpcomingEventCardsContainer = styled.div`
    overflow: auto;
    display: flex;
    justify-content: center;
`;

const Title = styled.h2`
    color: ${theme.primary};
    font-size: 30px;
    margin-bottom: 0;
`;

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    const now = new Date().getTime() / 1000; // current time in Unix timestamp

    const upcomingEvents = events
        .filter(event => event.start_time > now)
        .sort((a, b) => a.start_time - b.start_time)
        .slice(0, 3);

    return (
        <>
            <Title> <b>Upcoming Events</b> </Title>
            <UpcomingEventCardsContainer>
            {upcomingEvents.map(event => (
                <UpcomingEventCard key={event.id} event={event} />
            ))}
            </UpcomingEventCardsContainer>
        </>
    );
};

export default UpcomingEvents;
