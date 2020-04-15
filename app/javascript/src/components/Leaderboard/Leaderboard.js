import React, { useEffect, Suspense, lazy } from 'react'
import Aux from '../../hoc/Aux'
import Persons from './Persons/Persons'
import SearchBox from './SearchBox/SearchBox'
import PersonsSkeleton from './Persons/PersonsSkeleton'

const PERSONS = ['Henrik Hildebrand', 'Magnus Brattlöf', 'Andreas Erlandsson', 'Mikael Gordani', 'Victoria Karlsson', 'Jennifer Arvidsson', 'Christoffer Hildebrand']

const leaderboard = (props) => {
    const [persons, setPersons] = React.useState(PERSONS)

    const searchInputHandler = (input) => {
        setPersons(PERSONS.filter(person => person.toLowerCase().includes(input.toLowerCase())))
    }

    return(
        <Aux>
            <div style={{paddingBottom: 100, maxWidth: 500, margin: 'auto'}}>
                <SearchBox change={searchInputHandler} />
                <Persons persons={persons}/>
            </div>
        </Aux>
    );
}



export default leaderboard;


function fetchPersonsData(persons, timeout=1000) {
    let personsPromise = fetchPersons(persons, timeout);
    return {
      persons: wrapPromise(personsPromise),
    };
  }
  
  // Suspense integrations like Relay implement
  // a contract like this to integrate with React.
  // Real implementations can be significantly more complex.
  // Don't copy-paste this into your project!
  function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      r => {
        status = "success";
        result = r;
      },
      e => {
        status = "error";
        result = e;
      }
    );
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      }
    };
  }
  
  function fetchPersons(persons, timeout) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...persons]);
      }, timeout);
    });
  }
  