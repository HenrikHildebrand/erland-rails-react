import React from 'react'
import EventSkeleton from './Event/EventSkeleton'

const events = [1,2,3]

const eventsSkeleton = (props) => {

    return(
        events.map((event, index) => (
            <EventSkeleton key={index} />
        ))
    );
} 

export default eventsSkeleton