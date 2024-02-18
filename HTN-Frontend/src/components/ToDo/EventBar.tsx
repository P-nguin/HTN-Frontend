import React from 'react';
import styled from 'styled-components';

interface EventBarProps {
  left: number; // Percentage of the day when the event starts
  width: number; // Width of the event based on its duration
  color: string; // Color based on the event type
  eventName: string; // Name of the event
}

const StyledEventBar = styled.div<{ $left: number; $width: number; $color: string }>`
    position: absolute;
    background-color: ${props => props.$color};
    height: 20px;
    left: ${props => `${props.$left}%`};
    width: ${props => `${props.$width}%`};
    color: white;
    padding-left: 5px;
    text-align: left;
    border-radius: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const EventBar: React.FC<EventBarProps> = ({ left, width, color, eventName }) => {
    return (
        <StyledEventBar $left={left} $width={width} $color={color}> {eventName} </StyledEventBar>
    );
};

export default EventBar;
