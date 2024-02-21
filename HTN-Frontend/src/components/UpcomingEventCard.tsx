import React from 'react';
import styled from 'styled-components';
import EventData from '../types/EventData'; 
import { convertUnixTo24HourTime } from '../utils/timeUtils'; 
import { theme } from '../styles/theme'; 

// Interface for component props
interface UpcomingEventCardProps {
    event: EventData; // Single event data
}

// Styled component for the event card
const StyledEventCard = styled.div`
    height: 300px; // Fixed height, adjust based on your design needs
    width: 200px; // Fixed width, adjust based on your design needs
    background-color: ${theme.primary};
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    margin: 10px;
`;

// Functional component definition
const UpcomingEventCard: React.FC<UpcomingEventCardProps> = ({ event }) => {
    return (
        <StyledEventCard>
            <h2>{event.name}</h2> // Displaying the event name
            <p>{convertUnixTo24HourTime(event.start_time)}</p> // Displaying the event start time
        </StyledEventCard>
    );
};

export default UpcomingEventCard;