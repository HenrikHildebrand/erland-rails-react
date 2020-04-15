import React, { useEffect } from 'react'
import Aux from '../../../hoc/Aux'
import Person from './Person/Person'
import Fade from '@material-ui/core/Fade'

const personsContainer = ({persons}) => {
    const [fade, setFade] = React.useState(false)

    useEffect(()=>{
        setFade(true)
    }, [])

    if(persons.length > 0){
        return(
            <Aux>
                {   
                    persons.map((person, index) => (
                        <Fade key={index} timeout={400} style={{transitionDelay: (10*index)}} in={fade} mountOnEnter unmountOnExit>
                            <div><Person person={person} /></div>
                        </Fade>
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

