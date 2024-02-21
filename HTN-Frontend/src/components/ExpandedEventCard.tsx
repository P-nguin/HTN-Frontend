import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EventData from '../types/EventData';
import { convertUnixTo24HourTime } from '../utils/timeUtils';
import SmallEventCard from './SmallEventCard';
import { theme } from '../styles/theme';

// Interface to define props for the ExpandedEventCard component
interface ExpandedEventCardProps {
    event: EventData; // The event data to display
    onClose: () => void; // Function to call when the backdrop is clicked to close the card
  }
  
// Styled component for the backdrop overlay
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

// Styled component for the card that displays the event details
const Card = styled.div`
    background-color: ${theme.background};
    padding: 20px;
    border-radius: 5px;
    max-height: 80vh;
    max-width: 600px;
    overflow-y: auto;
    position: relative;

    // Hides scrollbar for WebKit browsers
    &::-webkit-scrollbar {
        display: none;
    }

    // Make scrollbar invisible but still functional in Firefox
    scrollbar-width: none; 
`;

// Styled component for the event title
const EventTitle = styled.h2`
  margin: 0;
  color: ${theme.primary}
`;

// Styled component for displaying event information
const EventInfo = styled.p`
  margin: 5px 0;
  color: ${theme.primary}
`;

// Styled component for the event description
const Description = styled.div`
  margin-top: 20px;
  color: ${theme.textTertiary}
`;

// Styled component for displaying similar events
const SimilarEvents = styled.div`
  margin-top: 30px;
  background: ${theme.backgroundSecondary}
  border-radius: 5px;
  color: ${theme.primary};
`;

// Styled component for the event links (if any)
const EventLinks = styled.p`
  margin-top: 20px;
  color: ${theme.primary}
`;

// Functional component definition for ExpandedEventCard
const ExpandedEventCard: React.FC<ExpandedEventCardProps> = ({ event, onClose }) => {
    // State to store related events
    const [relatedEvents, setRelatedEvents] = useState<EventData[]>([]);

    // Effect hook to fetch related events on component mount/update
    useEffect(() => {
        // Function to fetch related events based on the event data
        const fetchRelatedEvents = async () => {
            // Checking if the current event has related events
            if (event && event.related_events?.length) {
                // Fetching each related event's details and storing them
                const events = await Promise.all(
                    event.related_events.map(async (id) => {
                        const response = await fetch(`https://api.hackthenorth.com/v3/events/${id}`);
                        return await response.json();
                    })
                );
                setRelatedEvents(events);
            }
        };

        fetchRelatedEvents();
    }, [event]); // Dependency array includes event to re-fetch when the event prop changes

    // Render method for the component
    return (
        <Backdrop onClick={onClose}>
            <Card onClick={(event: React.MouseEvent) => {
                                    event.stopPropagation(); // Prevents click from closing the modal
            }}>
                <EventTitle>{event.name}</EventTitle>
                // Displaying various pieces of event information
                <EventInfo><strong>Time:</strong> {convertUnixTo24HourTime(event.start_time)} - {convertUnixTo24HourTime(event.end_time)}</EventInfo>
                <EventInfo><strong>Type:</strong> {event.event_type}</EventInfo>
                <EventInfo><strong>Permission:</strong> {event.permission}</EventInfo>
                <Description>{event.description}</Description>
                // Conditional rendering of event links
                <EventLinks>
                    <a href={event.public_url? event.public_url : event.private_url}>
                        Join the Event: {event.public_url? event.public_url : event.private_url}
                    </a>
                </EventLinks>
                // Rendering similar events if any
                <SimilarEvents>
                    <h3>Similar Events</h3>
                        {relatedEvents.map((relEvent) => (
                            <SmallEventCard key={relEvent.id} event={relEvent} onExpand={() => {}} />
                        ))}
                </SimilarEvents>
            </Card>
        </Backdrop>
    );
};

export default ExpandedEventCard;
