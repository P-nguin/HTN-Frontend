import React from 'react';
import styled from 'styled-components';

import { convertUnixTo24HourTime } from '../utils/timeUtils';

import EventData from '../types/EventData';

interface Props {
    event: EventData;
    onExpand: () => void;
}

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 8px;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.2em;
`;

const Type = styled.p`
  margin: 0;
  color: #666;
  font-size: 1em;
`;

const Permission = styled.p`
  margin: 0;
  color: #666;
  font-size: 1em;
`;

const SmallEventCard: React.FC<Props> = ({ event, onExpand }) => {
    return (
      <Card onClick={onExpand}>
        <Title>{event.name}</Title>
        <Type>{event.event_type}</Type>
        <p>{convertUnixTo24HourTime(event.start_time)} - {convertUnixTo24HourTime(event.end_time)}</p>
        <Permission>{`Permission: ${event.permission}`}</Permission>
      </Card>
    );
  };
  

export default SmallEventCard;
