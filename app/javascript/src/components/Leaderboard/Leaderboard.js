import React from 'react'
import Aux from '../../hoc/Aux'
import Persons from './Persons/Persons'
import SearchBox from './SearchBox/SearchBox'


const PERSONS = ['Henrik Hildebrand', 'Magnus Brattlöf', 'Andreas Erlandsson', 'Mikael Gordani', 'Victoria Karlsson', 'Jennifer Arvidsson', 'Christoffer Hildebrand']

const leaderboard = (props) => {
    const [persons, setPersons] = React.useState(PERSONS)


    const searchInputHandler = (input) => {
        setPersons(PERSONS.filter(person => person.toLowerCase().includes(input.toLowerCase())))
    }

    return(
        <Aux>
            <div style={{paddingBottom: 100}}>
                <SearchBox change={searchInputHandler} />
                <Persons persons={persons} />
            </div>
        </Aux>
    );
}

export default leaderboard;