// ExpandedEventCard.tsx
import React from 'react';
import styled from 'styled-components';

import EventData from '../types/EventData';
import { convertUnixTo24HourTime } from '../utils/timeUtils';

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
  background-color: #141414;
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
  background: none;
  font-size: 24px;
  cursor: pointer;
`;

const EventTitle = styled.h2`
  margin: 0;
`;

const EventInfo = styled.p`
  margin: 5px 0;
`;

const Description = styled.div`
  margin-top: 20px;
`;

const SimilarEvents = styled.div`
  margin-top: 20px;
`;

const ExpandedEventCard: React.FC<ExpandedEventCardProps> = ({ event, onClose }) => {
  return (
    <Backdrop>
      <Card>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <EventTitle>{event.name}</EventTitle>
        <EventInfo><strong>Time:</strong> {convertUnixTo24HourTime(event.start_time)} - {convertUnixTo24HourTime(event.end_time)}</EventInfo>
        <EventInfo><strong>Type:</strong> {event.event_type}</EventInfo>
        <EventInfo><strong>Permission:</strong> {event.permission}</EventInfo>
        <Description>{event.description}</Description>
        {/* Assuming you have a list of similar events or a way to retrieve them */}
        <SimilarEvents>
          <h3>Similar Events</h3>
          {/* Render similar events here */}
        </SimilarEvents>
      </Card>
    </Backdrop>
  );
};

export default ExpandedEventCard;
