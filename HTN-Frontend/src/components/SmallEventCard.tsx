import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { convertUnixTo24HourTime } from '../utils/timeUtils';
import { capitalizeWordsUnderscores, capitalizeWordsSpaces } from '../utils/stringUtils';
import EventData from '../types/EventData';

// Interface to define props for the SmallEventCard component
interface SmallEventCardProps {
    event: EventData; // Event data to display
    onExpand: () => void; // Function to call when the card is clicked (to expand the event)
}

// Styled component for the card
const Card = styled.div`
    display: flex; // Uses flex layout to align items horizontally
    align-items: center; // Aligns items vertically in the center
    background: ${theme.backgroundSecondary}; // Background color from theme
    overflow: auto; // Allows content to scroll if necessary
    border: 1px solid #ddd; // Light gray border
    border-radius: 8px; // Rounded corners
    padding: 16px; // Padding around content
    margin: 8px; // Margin around the card
    transition: box-shadow 0.3s ease-in-out; // Smooth transition for shadow on hover
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Drop shadow on hover for depth effect
        cursor: pointer; // Changes cursor to indicate clickable area
    }
    // Custom scrollbar styles
`;

// Styled component for the title of the event
const Title = styled.h3`
    margin: 0; // Removes default margin
    color: ${theme.primary}; // Primary text color from theme
    font-size: 1.2em; // Slightly larger text for emphasis
    flex-grow: 1; // Allows the title to fill available space, pushing other details to the right
`;

// Styled component for details of the event (type, time, permission)
const Detail = styled.p`
    margin: 0 8px; // Adds horizontal margin for spacing between details
    color: ${theme.secondary}; // Secondary text color from theme
    font-size: 1em; // Standard text size
    white-space: nowrap; // Keeps details on a single line
`;

// Functional component for SmallEventCard
const SmallEventCard: React.FC<SmallEventCardProps> = ({ event, onExpand }) => {
    // Render method returns the card with event details
    return (
        <Card onClick={onExpand}>
            <Title>{event.name}</Title> {/* Displays the event name */}
            <Detail>{capitalizeWordsUnderscores(event.event_type)}</Detail> {/* Displays the event type with formatting */}
            <Detail>{convertUnixTo24HourTime(event.start_time)} - {convertUnixTo24HourTime(event.end_time)}</Detail> {/* Displays the event start and end times */}
            <Detail>{capitalizeWordsSpaces(event.permission)}</Detail> {/* Displays the event permission level with formatting */}
        </Card>
    );
};

export default SmallEventCard;