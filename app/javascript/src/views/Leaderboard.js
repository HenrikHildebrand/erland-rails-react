import React, {useState, useEffect} from 'react'
import Aux from '../hoc/Aux'
import Persons from '../components/Persons/Persons'
import SearchBox from '../components/SearchBox/SearchBox'
import UserProfile from '../components/UserProfile/UserProfile'
import Slide from '@material-ui/core/Slide/index'

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
        <Slide direction='up' timeout={600} in={true} mountOnEnter>
            <div style={{paddingBottom: 100, height: '100%', overflowY: 'auto'}}>
                <div style={{maxWidth: 500, margin: 'auto'}}>
                  <UserProfile user={props.user} /> 
                  <SearchBox change={searchInputHandler} />
                  <Persons persons={props.persons} filteredPersons={filteredPersons} hasSearchInput={hasSearchInput} />
                </div>

            </div>
        </Slide>
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
  