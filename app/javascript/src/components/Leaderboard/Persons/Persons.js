import React, { useEffect } from 'react'
import Aux from '../../../hoc/Aux'
import Person from './Person/Person'
import Fade from '@material-ui/core/Fade'
import styles from './styles'

const personsContainer = ({persons, filteredPersons}) => {
    const classes = styles();

    if(filteredPersons.length > 0){
        return(
            <Aux>
                {   
                    persons.map((person, index) => (
                        
                        <div 
                            key={index} 
                            className={classes.maxHeightTransition}
                            style={{maxHeight: filteredPersons.includes(person) ? 1000 : 0}}>
                            <Fade timeout={400} style={{transitionDelay: (10*index)}} in={filteredPersons.includes(person)} mountOnEnter unmountOnExit>
                                <div>
                                    <Person person={person} />
                                </div>
                            </Fade>
                        </div>
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

export default personsContainer;

