import React, { useState } from 'react';
import EventData from '../types/EventData';
import SmallEventCard from './SmallEventCard';
import ExpandedEventCard from './ExpandedEventCard';
import { styled } from 'styled-components';
import { theme } from '../styles/theme';

interface EventListProps {
    events: EventData[];
}

const EventListContainer = styled.div`
    padding: 20px;
    background: ${theme.backgroundSecondary};
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
`;

const ToggleButton = styled.button`
    background-color: ${theme.secondary};
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-left: 6%;
    height: 42.5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const SearchInput = styled.input`
    padding: 10px;
    margin-right: 2.5%;
    width: 70%;
    box-sizing: border-box;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    background-color: ${theme.background};
    color: ${theme.textPrimary};

    &:focus {
        border-color: #007bff;
    }
`;

const NotExpanded = styled.h3`
    padding: 10px;
    margin-right: 50%; // This might not be necessary unless you want to push the text to the left
    color: ${theme.textPrimary};
    display: flex; // Use flexbox here too
    align-items: center; // Center the text inside this element
    justify-content: center; // Center the text horizontally if necessary
`;

const ControlsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const EventList: React.FC<EventListProps> = ({ events }) => {
    const [expandedEvent, setExpandedEvent] = useState<EventData | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
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
        <EventListContainer>
            <ControlsContainer>
                <ToggleButton onClick={toggleList}>{isExpanded ? 'Minimize' : 'Expand'}</ToggleButton>
                {isExpanded && <SearchInput 
                                    type="text" 
                                    placeholder="Search by ID, Name or Speaker" 
                                    value={searchQuery} 
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                }
                {!isExpanded && <NotExpanded> Expand to View All Events </NotExpanded>}
            </ControlsContainer>
            {isExpanded && filteredEvents.map((event) => (
                <SmallEventCard key={event.id} event={event} onExpand={() => handleExpandEvent(event)} />
            ))}
            {expandedEvent && <ExpandedEventCard event={expandedEvent} onClose={handleClose} />}
        </EventListContainer>
    );
};

export default EventList;
