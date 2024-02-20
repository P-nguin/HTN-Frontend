import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { convertUnixTo24HourTime } from '../utils/timeUtils';
import { capitalizeWordsUnderscores, capitalizeWordsSpaces } from '../utils/stringUtils';
import EventData from '../types/EventData';

interface SmallEventCardProps {
    event: EventData;
    onExpand: () => void;
}

const Card = styled.div`
    display: flex;
    align-items: center;
    background: ${theme.backgroundSecondary};
    overflow: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    margin: 8px;
    transition: box-shadow 0.3s ease-in-out;
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    // Hides scrollbar for WebKit browsers
    &::-webkit-scrollbar {
        display: none;
    }

    // Make scrollbar invisible but still functional in Firefox
    scrollbar-width: none; 
`;

const Title = styled.h3`
    margin: 0;
    color: ${theme.primary};
    font-size: 1.2em;
    flex-grow: 1; // Allow the title to take up extra space
`;

const Detail = styled.p`
    margin: 0 8px; // Add some margin for spacing
    color: ${theme.secondary};
    font-size: 1em;
    white-space: nowrap; // Prevent wrapping to ensure single-line appearance
`;

const SmallEventCard: React.FC<SmallEventCardProps> = ({ event, onExpand }) => {
    return (
        <Card onClick={onExpand}>
            <Title>{event.name}</Title>
            <Detail>{capitalizeWordsUnderscores(event.event_type)}</Detail>
            <Detail>{convertUnixTo24HourTime(event.start_time)} - {convertUnixTo24HourTime(event.end_time)}</Detail>
            <Detail>{capitalizeWordsSpaces(event.permission)}</Detail>
        </Card>
    );
};
  

export default SmallEventCard;
