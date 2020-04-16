import React from 'react'
import Aux from '../../hoc/Aux'
import Event from './Event/Event'

const events = (props) => {

    if(props.events.length <= 0) return <h2 align="center">Här fanns det inga event... :(</h2>
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