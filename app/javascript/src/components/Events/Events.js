import React from 'react'
import Aux from '../../hoc/Aux'
import Event from './Event/Event'

const events = (props) => {

    return(
        <Aux>
            <div style={{paddingBottom: 100}}>
            <h2 align="center">{props.label}</h2>
                {
                    props.events.map(event => (
                        <Event key={event.id} event={event} select={props.select}/>
                    ))
                }
            </div>
        </Aux>
    );
}

export default events;