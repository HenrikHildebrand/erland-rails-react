// import React, {Component} from 'react'
// import Swiper from '../Swiper'
// import EventCard from './EventCard'
// import Swal from 'sweetalert2'
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Zoom from '@material-ui/core/Zoom';
// import CreateEventCard from "./CreateEventCard"
// import EventFormDialog from './CreateEventDialog'
// // import '../stylesheets/app.scss'

// class EventSlider extends Component{
//     state = {
//         loaded: false,
//         activeView: 1,
//         events: [],
//         adminEvents: [],
//         zoom: true,
//         zoomDur: 300,
//         formOpen: false,
//         selectedEvent: {id: null, admin: false},
//         eventSelected: false,
//     }

//     getToken = () => (this.props.token.token_type + ' ' + this.props.token.access_token)

//     componentDidMount = () => {
//         fetch('/v1/events/',
//         {
//           method: "GET",
//           headers: {
//             'Accept': 'application/json',
//             ...this.props.state.auth
//           }
//         }).then(response => {
//             return response.json()
//         }).then(response => {
//             this.props.updateState({
//                 myEvents: response.my_events,
//                 allEvents: response.all_events,
//                 loaded: true,
//                 formOpen: false,
//                 selectedEvent: {id: null, admin: false},
//                 eventSelected: false
//             })
//             this.setState({loaded: true})
//         }).catch(error => console.log(error))
//     }

//     handleRequest = (id) => {
//         // console.log("REQUEST", id)
//         Swal.fire({
//             title: "Stängd!",
//             text: "Anmälan har inte öppnat för detta event ännu",
//             icon: 'info',
//             showConfirmButton: false,
//             timer: 3000,
//           })
//     }

//     handleNA = (id) => {
//         Swal.fire({
//             title: "Ej Tillgänglig",
//             text: "Denna feature har inte blivit tillgänglig ännu...",
//             icon: 'info',
//             showConfirmButton: false,
//             timer: 3000,
//           })
//     }

//     openForm = (open, event=null) => {
//         if(event){
//             let events = [...this.state.events]
//             let adminEvents = [...this.state.adminEvents]
//             allEvents.push(event)
//             allEvents.sort((a, b) =>  new Date(a.date)-new Date(b.date))
//             myEvents.push(event)
//             myEvents.sort((a, b) => (b.id-a.id))
//             this.setState({allEvents: allEvents, myEvents: myEvents, formOpen: false})
//             Swal.fire({
//                 title: "Event skapades!",
//                 text: 'Du finner eventet under "Mina" i event-vyn',
//                 icon: 'success',
//                 showConfirmButton: false,
//                 timer: 3000,
//             })
//         } else {
//             if(this.state.adminEvents.length > 2){
//                 Swal.fire({
//                     title: 'Ej tillgänglig!',
//                     text: "Du har nått maxgränsen (3 st) för egna event!",
//                     icon: 'error',
//                     showConfirmButton: false,
//                     timer: 3000,
//                 })
//             } else {
//                 this.setState({formOpen: open})
//             }
//         }
//     }

//     handleSelect = (id, admin) => {
//         this.setState({zoom: false, zoomDur: 100, selectedEvent: {id: id, admin: admin}, eventSelected: true })
//     }
    
//     afterTransition = () => {
//         if(this.state.eventSelected){
//             this.props.updateState({
//                 event: {
//                     id: this.state.selectedEvent.id,
//                     selected: true
//                 }
//             })
//         }
//     }

//     createEventCards = (events, label) => {
//         if(events != undefined) {
//             return (
//                 <div label={label} style={{paddingBottom: 50}}>
//                     {events.map((event, index) => (
//                         <Zoom key={index} timeout={this.state.zoomDur}
//                               in={this.state.loaded}
//                               style={{transitionDelay: (400 + 30 * (index + 1)) + "ms"}}>
//                             <div>
//                                 <EventCard
//                                     key={event.id}
//                                     id={event.id}
//                                     title={event.title}
//                                     admin={event.admin}
//                                     invite_only={event.invite_only}
//                                     public={event.public}
//                                     handleRequest={this.handleRequest}
//                                     handleSelect={this.handleSelect}
//                                     date={event.date}
//                                 />
//                             </div>
//                         </Zoom>
//                     ))}
//                 </div>
//             )
//         }else{
//             return <div label={label}><h3>Inga event</h3></div>
//         }
//     }


//     render(){
//         const myEvents = this.state.loaded ?
//             <div label="Mina">
//                 <Zoom key="createCard" style={{transitionDelay: 350 + "ms"}} in={this.state.loaded} >
//                     <div>
//                         <CreateEventCard click={() => this.openForm(true)}/>
//                     </div>
//                 </Zoom> {this.createEventCards(this.props.state.myEvents, 'Mina')}
//             </div> : null
//         const allEvents = this.state.loaded ? this.createEventCards(this.props.state.allEvents, 'Alla') : null
//         const invites = <div label="Inbjudningar"><h3>Du har inga inbjudningar</h3></div>



//         return(
//             this.state.loaded ? (
//                 <div>
//                     <Zoom
//                         timeout={300}
//                         in={!this.state.eventSelected}
//                         onExited={this.afterTransition}
//                         >
//                         <div>

//                             <Swiper>
//                                 {myEvents}
//                                 {allEvents}
//                                 {invites}
//                             </Swiper>
//                         </div>
//                     </Zoom>
//                     <EventFormDialog open={this.state.formOpen}  setOpen={this.openForm} token={this.props.state.auth} />
//                 </div>

//                 ): 
//                 <div style={{width: "fit-content", margin: "auto"}}>
//                     <CircularProgress />
//                 </div>
//         );
//     }
// }



// import { connect } from "react-redux";
// import { update } from "../../actions/stateActions"

// const mapStateToProps = (state) => {
//     return { ...state }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateUser: (currentUser) => { dispatch(update.user(currentUser)) },
//         updateState: (state) => {
//             console.log("[App.js] dispatch")
//             dispatch(update.state(state))
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(EventSlider);
