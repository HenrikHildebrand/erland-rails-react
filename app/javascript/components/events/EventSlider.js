import React, {Component} from 'react'
import Slider from '../common/Slider'
import EventCard from './EventCard'
import Swal from 'sweetalert2'
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateEventCard from "./CreateEventCard"
import Zoom from '@material-ui/core/Zoom';
import EventFormDialog from './CreateEventDialog'
import Slide from '@material-ui/core/Slide';

class EventSlider extends Component{
    state = {
        loaded: false,
        activeView: 1,
        events: [],
        adminEvents: [],
        zoom: true,
        zoomDur: 1,
        formOpen: false,
        selectedEvent: {id: null, admin: false},
        eventSelected: false
    }

    getToken = () => (this.props.token.token_type + ' ' + this.props.token.access_token)

    componentDidMount = () => {
        fetch('/v1/events/',
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
          }
        }).then(response => {
            return response.json()
        }).then(response => {
            this.props.updateState({
                myEvents: response.my_events,
                allEvents: response.admin_events,
                loaded: true,
                selectedEvent: {id: null, admin: false},
                eventSelected: false
            })
        }).catch(error => console.log(error))
    }

    handleRequest = (id) => {
        // console.log("REQUEST", id)
        Swal.fire({
            title: "Stängd!",
            text: "Anmälan har inte öppnat för detta event ännu",
            type: 'info',
            showConfirmButton: false,
            timer: 3000,
          })
    }

    handleNA = (id) => {
        Swal.fire({
            title: "Ej Tillgänglig",
            text: "Denna feature har inte blivit tillgänglig ännu...",
            type: 'info',
            showConfirmButton: false,
            timer: 3000,
          })
    }

    openForm = (open, event=null) => {
        if(event){
            let events = [...this.state.events]
            let adminEvents = [...this.state.adminEvents]
            events.push(event)
            events.sort((a, b) =>  new Date(a.date)-new Date(b.date))
            adminEvents.push(event)
            adminEvents.sort((a, b) => (b.id-a.id))
            this.setState({events: events, adminEvents: adminEvents, formOpen: false})
            Swal.fire({
                title: "Event skapades!",
                text: 'Du finner eventet under "Mina" i event-vyn',
                type: 'success',
                showConfirmButton: false,
                timer: 3000,
              })
        } else {
            if(this.state.adminEvents.length > 2){
                Swal.fire({
                    title: 'Ej tillgänglig!',
                    text: "Du har nått maxgränsen (3 st) för egna event!",
                    type: 'error',
                    showConfirmButton: false,
                    timer: 3000,
                  })
            } else {
                this.setState({formOpen: open})
            }
        }
    }

    handleSelect = (id, admin) => {
        this.setState({zoom: false, zoomDur: 100, selectedEvent: {id: id, admin: admin}, eventSelected: true })
    }
    
    afterTransition = () => {
        if(this.state.eventSelected){
            this.props.handleSelect(this.state.selectedEvent.id, this.state.selectedEvent.admin)
        }
    }
    createEventCards = (events, label) => (
        <div label={label}>
            {events.map((event, index) => (
                <Zoom key={index} onExited={this.afterTransition} timeout={this.state.zoomDur} in={this.state.zoom} style={{transitionDelay: this.state.zoom ? 30*(index+1)+"ms" : ""}} >
                    <div>
                        <EventCard
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            admin={event.admin}
                            invite_only={event.invite_only}
                            public={event.public}
                            handleRequest={this.handleRequest}
                            handleSelect={this.handleSelect}
                            date={event.date}
                        />
                    </div>
                </Zoom>
            ))}
        </div>
    )

    render(){
        const myEvents = this.createEventCards(this.state.myEvents, 'Mina')
        const allEvents = this.createEventCards(this.state.allEvents, 'Alla')
        const invites = <div><h3>Du har inga inbjudningar</h3></div>
        return(
            this.state.loaded ? (
                <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
                    <div>
                        <Slider>
                            {events}
                        </Slider>
                        <EventFormDialog open={this.state.formOpen}  setOpen={this.openForm} token={this.props.token} />
                    </div>
                </Slide>
                ): 
                <div style={{width: "fit-content", margin: "auto"}}>
                    <CircularProgress />
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { ...state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (currentUser) => { dispatch(update.user(currentUser)) },
        updateState: (state) => {
            console.log("[App.js] dispatch")
            dispatch(update.state(state))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSlider);