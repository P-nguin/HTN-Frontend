import React from 'react';
import styled from 'styled-components';
import EventData from '../types/EventData';

interface EventScheduleProps {
  events: EventData[];
}

// Styled components for the schedule and events
const ScheduleContainer = styled.div`
  display: flex;
  position: relative;
  height: 50px; // Adjust based on your needs
  background: #f0f0f0; // Background color for the schedule
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  width: 100vw;
`;

const HashMark = styled.div`
  position: absolute;
  height: 100%;
  border-left: 1px solid black;
`;

const EventBar = styled.div<{ color: string; left: number; width: number }>`
  position: absolute;
  background-color: ${props => props.color};
  height: 30px; // Adjust based on your needs
  line-height: 30px; // To vertically center text
  left: ${props => props.left}%;
  width: ${props => props.width}%;
`;

// Function to convert a time to a percentage of the day
const timeToPercent = (time: Date) => {
  return ((time.getHours() * 60 + time.getMinutes()) / (24 * 60)) * 100;
};

// EventSchedule component
const EventSchedule: React.FC<EventScheduleProps> = ({ events }) => {
  // Assuming the day starts at 00:00 and ends at 24:00
  const hashmarks = [...Array(24).keys()].map(hour => (
    <HashMark key={hour} style={{ left: `${(hour / 24) * 100}%` }} />
  ));

  const eventBars = events.map(event => {
    const startTime = new Date(event.start_time * 1000); // Convert to milliseconds
    const endTime = new Date(event.end_time * 1000);
    const left = timeToPercent(startTime);
    const right = timeToPercent(endTime);
    const width = right - left;
    const colorMap: { [key: string]: string } = {
      'workshops': 'darkblue',
      'activity': 'blue',
      'tech_talks': 'lightblue'
    };
    const color = colorMap[event.event_type] || 'grey'; // Default color if no match

    return (
      <EventBar key={event.id} color={color} left={left} width={width}>
        {event.name}
      </EventBar>
    );
  });

  return (
    <ScheduleContainer>
      {hashmarks}
      {eventBars}
    </ScheduleContainer>
  );
};

export default EventSchedule;
