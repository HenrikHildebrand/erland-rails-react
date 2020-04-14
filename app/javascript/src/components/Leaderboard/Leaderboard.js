import React from 'react'
import Aux from '../../hoc/Aux'
import Persons from './Persons/Persons'
import SearchBox from './SearchBox/SearchBox'


const persons = ['Henrik Hildebrand', 'Magnus Brattlöf', 'Andreas Erlandsson']

const leaderboard = (props) => (
    <Aux>
        <SearchBox />
        <Persons persons={persons} />
    </Aux>
);


export default leaderboard;