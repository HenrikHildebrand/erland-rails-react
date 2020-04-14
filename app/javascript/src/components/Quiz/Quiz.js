import React from 'react'
import Aux from '../../hoc/Aux'
import Map from './Map/Map'
import QuestionDrawer from './QuestionDrawer/QuestionDrawer'
import QuestionButton from './Buttons/QuestionButton'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const questions = [
    {
        title: "vad Heter jag?",
        alternatives: ["henrik", "kenneth", "reine"]
    },
    {
        title: "vad Heter Magnus?",
        alternatives: ["henrik", "Magnus", "Andreas"]
    }
]
const quiz = (props) => {
    const [open, setOpen] = React.useState(false)

    return(
        <Aux>
            <ErrorBoundary>
                <Map>
                    <QuestionButton click={() => setOpen(true)}/> 
                </Map>
                <QuestionDrawer 
                    open={open} 
                    setOpen={setOpen} 
                    questions={questions}/>
            </ErrorBoundary>
        </Aux>
    );
} 


export default quiz;