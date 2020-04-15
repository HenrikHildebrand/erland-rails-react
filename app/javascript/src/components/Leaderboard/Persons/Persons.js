import React, { useEffect } from 'react'
import Aux from '../../../hoc/Aux'
import Person from './Person/Person'

const persons = (props) => {
    let persons;
    if (props.timeout){
        persons = props.resource.persons.read()
    }else{
        persons = props.resource
    }
    if(persons.length > 0){
        return(
            <Aux>
                {   
                    persons.map((person, index) => (
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

function fetchPersonsData(persons) {
    let personsPromise = fetchPersons(persons);
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
  
  function fetchPersons(persons) {
    console.log("fetch user...");
    return new Promise(resolve => {
      setTimeout(() => {
        console.log("fetched user", persons);
        resolve([...persons]);
      }, 1000);
    });
  }
  