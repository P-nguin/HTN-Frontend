import React from 'react';
import EventData from '../types/EventData';
import UpcomingEventCard from './UpcomingEventCard';
import { styled } from 'styled-components';
import { theme } from '../styles/theme';

// Interface to define the props expected by the UpcomingEvents component
interface UpcomingEventsProps {
  events: EventData[]; // An array of event data objects
}

// Styled component for the container that holds all upcoming event cards
const UpcomingEventCardsContainer = styled.div`
    overflow: auto; // Allows scrolling if content overflows
    display: flex; // Uses flexbox for layout
    justify-content: center; // Centers the cards horizontally
`;

// Styled component for the title of the Upcoming Events section
const Title = styled.h2`
    color: ${theme.primary}; // Sets the text color using the theme
    font-size: 30px; // Sets a fixed font size
    margin-bottom: 0; // Removes the bottom margin
`;

// Functional component definition for UpcomingEvents
const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    // Current time in Unix timestamp for filtering upcoming events
    const now = new Date().getTime() / 1000;

    // Filters and sorts the events to get the upcoming ones, limiting to the first 3
    const upcomingEvents = events
        .filter(event => event.start_time > now) // Filters events that are in the future
        .sort((a, b) => a.start_time - b.start_time) // Sorts events by start time in ascending order
        .slice(0, 3); // Limits the result to the first 3 upcoming events

    // Render method for the UpcomingEvents component
    return (
        <>
            <Title> <b>Upcoming Events</b> </Title> {/* Displaying the title for the section */}
            <UpcomingEventCardsContainer>
            {upcomingEvents.map(event => (
                <UpcomingEventCard key={event.id} event={event} /> // Maps each upcoming event to an UpcomingEventCard component
            ))}
            </UpcomingEventCardsContainer>
        </>
    );
};

export default UpcomingEvents;
