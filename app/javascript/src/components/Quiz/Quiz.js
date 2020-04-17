import React, {useState} from 'react'
import Aux from '../../hoc/Aux'
import Map from './Map/Map'
import QuestionDialogs from './QuestionDialogs/QuestionDialogs'
import QuestionDrawer from './QuestionDrawer/QuestionDrawer'
import QuestionButton from './Buttons/QuestionButton'
import NavButton from './Buttons/NavButton'
import Swal from 'sweetalert2'


const quiz = (props) => {
    const [open, setOpen] = useState(false)
    const [center, setCenter] = useState(ubit)
    const [current, setCurrent] = useState({open: false, index: null})
    const [trackCurrent, setTrackCurrent] = useState(false)

    const dialogClose = (save, altIndex) => {
        setCurrent({open: false})
        if(save){
            Swal.fire({
                title: 'Ditt svar skickades!',
                text: `Du svarade ${questions[current.index].alternatives[altIndex]}`,
                icon: 'success',
                showConfirmButton: false,
                timer: 3000,
              })
        }
    } 

    return(
        <Aux>
            <Map center={center} questions={questions} markerClick={setCurrent} trackCurrentPosition={trackCurrent}>
                <QuestionButton click={() => setOpen(true)}/>
                <NavButton click={() => {console.log("TrackCurrent:", !trackCurrent); setTrackCurrent(!trackCurrent); }} />
            </Map>
            <QuestionDialogs questions={questions} current={current} onClose={dialogClose} />
            <QuestionDrawer 
                open={open} 
                setOpen={setOpen} 
                setCenter={setCenter}
                questions={questions}/>
        </Aux>
    );
} 


export default quiz;











const ubit = {lat: 57.6982853, lng: 11.9752105}

const questions = [
    {
        title: "vad Heter jag?",
        alternatives: ["henrik", "kenneth", "reine"],
        position: {lat: 57.7982853, lng: 11.8752105}
    },
    {
        title: "vad Heter Magnus?",
        alternatives: ["henrik", "Magnus", "Andreas"],
        position: {lat: 57.6983853, lng: 11.9753105}
    }
]