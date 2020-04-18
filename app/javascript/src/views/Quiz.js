import React, {useState} from 'react'
import Aux from '../hoc/Aux'
import Map from '../components/Map/Map'
import QuestionDrawer from '../components/Questions/QuestionDrawer/QuestionDrawer'
import QuestionButton from '../components/Buttons/QuestionButton'
import NavButton from '../components/Buttons/NavButton'
import Swal from 'sweetalert2'



const quiz = (props) => {
    const [open, setOpen] = useState(false)
    const [center, setCenter] = useState(ubit)
    const [current, setCurrent] = useState({open: false, index: null})
    const [trackCurrent, setTrackCurrent] = useState(false)

    const openQuestionDialog = async (question) => {
        const inputOptions = new Promise((resolve) => {
            let alternatives = {}
            question.attributes.alternatives.map(alt => {
                alternatives[alt.id] = alt.title
            })
            resolve(alternatives)
          });
          
          const { value: answer } = await Swal.fire({
            title: question.attributes.title,
            input: 'radio',
            inputOptions: inputOptions,
            inputValidator: (value) => {
              if (!value) {
                return 'Du måste välja ett alternativ'
              }
            }
          })
          if(answer){
            const selected = question.attributes.alternatives.filter(alt => (parseInt(answer) === alt.id))[0]
            if(selected.correct){
                Swal.fire({
                    title: 'Du svarade rätt!',
                    text: `Du belönas med en credit!`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 3000,
                  })
            } else {
                Swal.fire({
                    title: 'Du svarade fel!',
                    text: `Försök igen...`,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                })
            }
          }

    }


    return(
        <Aux>
            <Map center={center} questions={props.questions} markerClick={openQuestionDialog} trackCurrentPosition={trackCurrent}>
                <QuestionButton click={() => setOpen(true)}/>
                <NavButton click={() => {console.log("TrackCurrent:", !trackCurrent); setTrackCurrent(!trackCurrent); }} />
            </Map>
            <QuestionDrawer 
                open={open} 
                setOpen={setOpen} 
                setCenter={setCenter}
                questions={props.questions}/>
        </Aux>
    );
} 


export default quiz;











const ubit = {lat: 57.6982853, lng: 11.9752105}
