import React, { useEffect, useState } from 'react';
import EventData from '../types/EventData';
import EventList from './EventList';
import UpcomingEvents from './UpcomingEvents';

interface DashboardProps {
    events: EventData[];
}

const Dashboard: React.FC<DashboardProps> = ({events}) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Dashboard</p>
            <UpcomingEvents events={events}/>
            <EventList events={events} />
        </div>
    );
};

export default Dashboard;
