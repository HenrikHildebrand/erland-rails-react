import React from 'react'
import Aux from '../../../hoc/Aux'
import Person from './Person/Person'

const persons = (props) => {
    if(props.persons.length > 0){
        return(
            <Aux>
                {   
                    props.persons.map((person, index) => (
                        <Person key={index} person={person} />
                    ))
                }
            </Aux>
        );
    } else {
        return(
            <div style={{justifyContent: "center"}}>
                <h3>No matches...</h3>
            </div>
        )
    }
}


export default persons