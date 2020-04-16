import React, {useState, useEffect} from 'react'
import Aux from '../../hoc/Aux'
import Persons from './Persons/Persons'
import SearchBox from './SearchBox/SearchBox'
import PersonsSkeleton from './Persons/PersonsSkeleton'

const PERSONS = ['Henrik Hildebrand', 'Magnus Brattlöf', 'Andreas Erlandsson', 'Mikael Gordani', 'Victoria Karlsson', 'Jennifer Arvidsson', 'Christoffer Hildebrand']

const leaderboard = (props) => {
    const [filteredPersons, setFilteredPersons] = useState(props.persons)
    const [showSkeleton, setShowSkeleton] = useState(true)
    const [hasSearchInput, setHasSearchInput] = useState(false)
    
    const searchInputHandler = (input) => {
        setFilteredPersons(props.persons.filter(person => {
          if(person.attributes.name){
            return person.attributes.name.toLowerCase().includes(input.toLowerCase()) || person.attributes.email.toLowerCase().includes(input.toLowerCase())
          } else {
            return person.attributes.email.toLowerCase().includes(input.toLowerCase())
          }
        }))
        setHasSearchInput(input!=null)
    }

    useEffect(() =>{
      setShowSkeleton(false)
      setTimeout(()=>{
        setFilteredPersons(props.persons)
      }, 400)
    },[props.persons])

    return(
        <Aux>
            <div style={{paddingBottom: 100, maxWidth: 500, margin: 'auto', height: '100%', overflowY: 'auto'}}>
                <SearchBox change={searchInputHandler} />
                <Persons persons={props.persons} filteredPersons={filteredPersons} hasSearchInput={hasSearchInput} />
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
  