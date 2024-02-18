import React, { useState } from 'react';
import EventData from '../types/EventData';
import SmallEventCard from './SmallEventCard';
import ExpandedEventCard from './ExpandedEventCard';

interface EventListProps {
    events: EventData[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
    const [expandedEvent, setExpandedEvent] = useState<EventData | null>(null);

    const handleExpandEvent = (event: EventData) => {
        setExpandedEvent(event);
    };

    const handleClose = () => {
        setExpandedEvent(null);
    };

    return (
        <div>
            {events.map((event) => (
                <SmallEventCard key={event.id} event={event} onExpand={() => handleExpandEvent(event)} />
            ))}
            {expandedEvent && <ExpandedEventCard event={expandedEvent} onClose={handleClose} />}
        </div>
    );
};

export default EventList;
