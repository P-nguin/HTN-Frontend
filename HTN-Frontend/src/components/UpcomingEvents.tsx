import React from 'react';
import EventData from '../types/EventData';
import UpcomingEventCard from './UpcomingEventCard'; // Assume this is your card component

interface UpcomingEventsProps {
  events: EventData[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const now = new Date().getTime() / 1000; // current time in Unix timestamp

  const upcomingEvents = events
    .filter(event => event.start_time > now)
    .sort((a, b) => a.start_time - b.start_time)
    .slice(0, 3);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {upcomingEvents.map(event => (
        <UpcomingEventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default UpcomingEvents;
