import React from 'react'
import Aux from '../../../hoc/Aux'
import Person from './Person/Person'

const persons = (props) => (
        <Aux>
            {
                props.persons.map((person, index) => (
                    <Person key={index} person={person} />
                ))
            }
        </Aux>
    );


export default persons