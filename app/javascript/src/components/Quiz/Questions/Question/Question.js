import React from 'react'
import Aux from '../../../../hoc/Aux'
import { Marker } from 'google-maps-react';

const questionMarker = ({draggable=false}) => {
    return(
        <Aux>
            <Marker
                position={props.position}
                draggable={draggable}
                onClick={props.click}
                />
        </Aux>
    );
}