import React, { useState } from 'react';
import EventData from '../types/EventData';
import SmallEventCard from './SmallEventCard';
import ExpandedEventCard from './ExpandedEventCard';

interface EventListProps {
    events: EventData[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
    const [expandedEvent, setExpandedEvent] = useState<EventData | null>(null);
    const [isExpanded, setIsExpanded] = useState(true); // New state for toggling view
    const [searchQuery, setSearchQuery] = useState('');

    const handleExpandEvent = (event: EventData) => {
        setExpandedEvent(event);
    };

    const handleClose = () => {
        setExpandedEvent(null);
    };

    const toggleList = () => {
        setIsExpanded(!isExpanded);
    };

    const filteredEvents = events.filter(event => 
        event.id.toString().includes(searchQuery) || 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.speakers && event.speakers.some(speaker => speaker.name.toLowerCase().includes(searchQuery.toLowerCase())))
    );
    
    return (
        <div>
            <button onClick={toggleList}>{isExpanded ? 'Minimize' : 'Expand'}</button>
            <input 
                type="text" 
                placeholder="Search by ID, Name or Speaker" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            {isExpanded && filteredEvents.map((event) => (
                <SmallEventCard key={event.id} event={event} onExpand={() => handleExpandEvent(event)} />
            ))}
            {expandedEvent && <ExpandedEventCard event={expandedEvent} onClose={handleClose} />}
        </div>
    );
};

export default EventList;
