// UpcomingEventCard.tsx
import React from 'react';
import styled from 'styled-components';
import EventData from '../types/EventData';
import { convertUnixTo24HourTime } from '../utils/timeUtils';

interface UpcomingEventCardProps {
    event: EventData;
}

const StyledEventCard = styled.div`
    height: 300px; // Adjust based on your design
    width: 200px; // Adjust based on your design
    background-color: #00008b;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    margin: 10px;
`;

const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ event }) => {
    return (
        <StyledEventCard>
            <h2>{event.name}</h2>
            <p>{convertUnixTo24HourTime(event.start_time)}</p>
        </StyledEventCard>
    );
};

export default UpcomingEventCard;
