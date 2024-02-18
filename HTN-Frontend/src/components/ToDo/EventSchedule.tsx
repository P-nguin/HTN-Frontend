import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventData from '../../types/EventData';
import EventBar from './EventBar';

// Styles
const ScheduleContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 90vw; // Ensure container does not extend beyond the viewport
  box-sizing: border-box; // Make sure padding and border are included in the width
  padding: 0 25px; // Adjust padding as needed
  overflow-x: hidden; // Hide horizontal overflow
`;

// Helper function to get the color based on event type
const getEventColor = (eventType: string): string => {
  const colors: { [key: string]: string } = {
    workshop: 'deepskyblue',
    activity: 'blue',
    tech_talk: 'lightblue',
  };
  return colors[eventType] || 'grey';
};

// Main Component
const EventSchedule: React.FC<{ events: EventData[] }> = ({ events }) => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    // Set up an event listener for window resize
    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // This function will calculate the left position based on the event start time
    const calculateLeftPosition = (eventStartTime: number) => {
        const eventDate = new Date(eventStartTime * 1000);
        const hour = eventDate.getHours();
        const minutes = eventDate.getMinutes();
        return ((hour + minutes / 60) * (viewportWidth - 50)) / 24;
    };

    // This function will calculate the width based on the event duration
    const calculateWidth = (eventStartTime: number, eventEndTime: number) => {
        const duration = (eventEndTime - eventStartTime) / 3600; // Duration in hours
        return (duration * (viewportWidth - 50)) / 24;
    };

    // Sort events by start time
    events.sort((a, b) => a.start_time - b.start_time);

    // Render the schedule
    return (
        <ScheduleContainer>
        {events.map((event) => {
            const left = calculateLeftPosition(event.start_time);
            const width = calculateWidth(event.start_time, event.end_time);
            const color = getEventColor(event.event_type);

            return (
                <EventBar key={event.id} left={left} width={width} color={color} eventName={event.name} />
            );
        })}
        </ScheduleContainer>
    );
};

export default EventSchedule;