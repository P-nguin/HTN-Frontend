import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import EventData from '../types/EventData';
import { convertUnixTo24HourTime } from '../utils/timeUtils';
import SmallEventCard from './SmallEventCard';
import { theme } from '../styles/theme';

interface ExpandedEventCardProps {
  event: EventData;
  onClose: () => void;
}

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

const Card = styled.div`
  background-color: ${theme.background};
  padding: 20px;
  border-radius: 5px;
  max-height: 80vh;
  max-width: 600px;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: ${theme.backgroundSecondary};
  font-size: 24px;
  cursor: pointer;
`;

const EventTitle = styled.h2`
  margin: 0;
  color: ${theme.primary}
`;

const EventInfo = styled.p`
  margin: 5px 0;
  color: ${theme.primary}
`;

const Description = styled.div`
  margin-top: 20px;
  color: ${theme.textTertiary}
`;

const SimilarEvents = styled.div`
  margin-top: 30px;
  background: ${theme.backgroundSecondary}
  border-radius: 5px;
  color: ${theme.primary};
`;

const ExpandedEventCard: React.FC<ExpandedEventCardProps> = ({ event, onClose }) => {
    const [relatedEvents, setRelatedEvents] = useState<EventData[]>([]);
    useEffect(() => {
        // Fetch related events details
        const fetchRelatedEvents = async () => {
            if (event && event.related_events?.length) {
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
    }, [event]);

    return (
        <Backdrop>
            <Card>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <EventTitle>{event.name}</EventTitle>
                <EventInfo><strong>Time:</strong> {convertUnixTo24HourTime(event.start_time)} - {convertUnixTo24HourTime(event.end_time)}</EventInfo>
                <EventInfo><strong>Type:</strong> {event.event_type}</EventInfo>
                <EventInfo><strong>Permission:</strong> {event.permission}</EventInfo>
                <Description>{event.description}</Description>
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
