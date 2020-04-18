import React, { useEffect } from 'react'
import Aux from '../../hoc/Aux'
import Person from './Person/Person'
import Fade from '@material-ui/core/Fade/index'
import styles from './styles'
import { checkPropTypes } from 'prop-types'
import PersonSkeleton from './Person/PersonSkeleton'

const personsContainer = ({persons, filteredPersons, showSkeleton=true, hasSearchInput}) => {
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
                                <div><Person person={person} /></div>
                            </Fade>
                        </div>
                    ))
                }
            </Aux>
        );
    } else if(persons !== filteredPersons && hasSearchInput){
        return(
            <div style={{justifyContent: "center"}}>
                <h3 align="center">No matches... :(</h3>
            </div>
        )
    } else {
        return(
            <Fade in={showSkeleton} timeout={400} mountOnEnter unmountOnExit>
                <div><PersonSkeleton /></div>
            </Fade>
        )
    }
}

export default personsContainer;

