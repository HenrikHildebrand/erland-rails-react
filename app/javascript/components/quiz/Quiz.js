import React, { Component } from "react"
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import { geolocated } from "react-geolocated";
import QuestionDialog from "./QuestionDialogComponent"
import LocationDrawer from "./LocationDrawer"
import ListIcon from '@material-ui/icons/List';
import "../stylesheets/App.scss"
import {Spring} from 'react-spring/renderprops'
import Swal from 'sweetalert2'
import AdminAddBtn from './AdminAddBtn'
import AddQuestionDialog from './AddQuestioonDialog'
 
const api_key = "AIzaSyD0Mknc1_dWFz7iRLF24lVFm4edmyxw3g4";

const buttonStyles = {
    fab: {
      position: "absolute",
      bottom: "80px",
      left: "20px",
      zIndex: "996",
      outline: "0px !important",
    //   backgroundColor: "#007bff",
    },
    fabList: {
        position: "absolute",
        bottom: "20px",
        left: "20px",
        zIndex: "996",
        outline: "0px !important",
        // backgroundColor: "#007bff",
      },
    extendedIcon: {
      marginRight: "0px"
    },
  };

  const ubit = {lat: 57.6982853, lng: 11.9752105}  

class Quiz extends Component {
    state = {
        dimensions: null,
        centerLocation: ubit,
        trackCurrent: true,
        locations: [],
        newMarker: {},
        addNewMarker: false,
        currentQuestion: "",
        dialogOpen: false,
        currentLocation: ubit,
        drawerOpen: false,
        activeQuestion: {pin: null, index: null, answers: null, showAnswers: false},
        activeMarker: null, 
        limit: 20,
        infoMessage: "",
        zoom: 15,
        hasAuthority: false,
        addQuestionOpen: false
    }

    componentDidMount() {
        fetch('/api/events/' + this.props.event + '/questions/all/?format=json',{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.tokenType + " " + this.props.token
            }
        }).then(response => {
            if(response.status === 401){
                this.props.logout()
                return false
            }
            return response.json()
        })
        .then(response => {
            if(!response) return
            const locations = response.questions.map((pin, index) => ({...pin, answer: null}));
            this.setState({
                locations: locations, 
                loaded: true, 
                currentLocation: ( this.props.coords ? {lat: this.props.coords.latitude, lng: this.props.coords.longitude} : ubit),
                hasAuthority: response.has_authority
            })
        }).catch(error => console.log(error));
        this.interval = setInterval(() => {this.setState({...this.state, currentLocation: (this.props.coords ? {lat: this.props.coords.latitude, lng: this.props.coords.longitude} : ubit)}); }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    calcDistance(point1, point2, unit) {
        if (point1 === point2) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * point1.lat/180;
            var radlat2 = Math.PI * point2.lat/180;
            var theta = point1.lng - point2.lng;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit==="K") { dist = dist * 1.609344 }
            if (unit==="N") { dist = dist * 0.8684 }
            if (unit==="M") { dist = dist * 1.609344 * 1000 }
            return dist;
        }
    }
    

    toRadians = (degrees) => {
        var pi = Math.PI;
        return degrees * (pi/180);
    }

    onCurrentPositionClick = () => {
        if(this.props.isGeolocationAvailable && this.props.isGeolocationEnabled) {
            this.setState({trackCurrent: true, currentLocation: ( this.props.coords ? {lat: this.props.coords.latitude, lng: this.props.coords.longitude} : ubit )})
        }
    }

    drawerSelectedHandler = (event, newLocation) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ ...this.state, centerLocation: newLocation, trackCurrent: false, drawerOpen: false, zoom: 18 });
    }

    markerClickedHandler = (pin, index, marker) => {
        const point2 = {lat: pin.latitude, lng: pin.longitude}
        const dist = this.calcDistance(this.state.currentLocation, point2, 'M')
        console.log(this.props.admin)
        if(dist < this.state.limit || this.state.hasAuthority){
            this.setState({
                dialogOpen: true, 
                activeQuestion: {pin: pin, index: index}, 
                trackCurrent: false, 
                centerLocation: {lat: pin.latitude, lng: pin.longitude}
            })
        } else {
            Swal.fire({
                title: "Du är för långt ifrån!",
                text: "Du måste komma " + parseInt(dist - this.state.limit) + " meter närmare för att svara på denna fråga!",
                type: 'error',
                showConfirmButton: false,
                timer: 3000,
              })
        }
    } 

    dialogCloseHandler = (save) => {
        if(save){
            fetch('/api/events/' + this.props.event + '/questions/' + this.state.activeQuestion.pin.id + '/answers', 
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.tokenType + " " + this.props.token
                },
                body: JSON.stringify({"answer": this.state.activeQuestion.pin.answer})
            }).then(response => {
                if(response.status === 403){
                    this.setState({dialogOpen: false})
                    Swal.fire({
                        title: 'Du har redan svarat på denna fråga!',
                        text: 'Försök med en annan fråga...',
                        type: 'error',
                        showConfirmButton: false,
                        timer: 3000,
                      })    
                }else if(response.status === 202){
                    Swal.fire({
                        title: 'Rätt svar!',
                        text: 'Du svarade rätt och belönades med en credit!',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 3000,
                      })
                }else{
                    Swal.fire({
                        title: 'Fel svar!',
                        text: 'Tyvärr svarade du fel... Försök med en annan fråga...',
                        type: 'error',
                        showConfirmButton: false,
                        timer: 3000,
                      })
                }
                this.setState({dialogOpen: false})
            });
        } else {
            this.setState({dialogOpen: false})
        }
        
    }

    calculateDistance = (point1, point2) => {
        const earthRadius = 6371e3;
        const latRad1 = point1.lat.toRadians();
        const latRad2 = point2.lat.toRadians();
        const deltaLat = (point2.lat - point1.lat).toRadians();
        const deltaLng = (point2.lng - point2.lng).toRadians();
        const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
                Math.cos(latRad1) * Math.cos(latRad2) *
                Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = earthRadius * c;
        return d
    }

    toggleDrawer = (event, open) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ ...this.state, drawerOpen: open });
    };

    handleAnswerChanged = (event, index, altId) => {
        const locations = [...this.state.locations]
        locations[index].answer = altId;
        this.setState({
            ...this.state,
            locations: locations
        })
    }

    getAnswers = (id) => {
        fetch('/api/locations/' + id + '/answers').then(response => response.json()).then(response => this.setState({activeQuestion:{...this.state.activeQuestion, answers: response, showAnswers: true}}))
    }

    onNewMarkerClick(t, map, coord, addNewMarker) {
        if(addNewMarker){
            const { latLng } = coord;
            const lat = latLng.lat();
            const lng = latLng.lng();
        
            this.setState({newMarker: {
                    title: "",
                    name: "",
                    position: { lat, lng }
                },
                addQuestionOpen: true
            })
        }
    }
    
    toggleNewMarker = (index) => {
        this.setState({addNewMarker: index === 1 })
    }

    setAddQuestionOpen = (open) => {
        this.setState({addQuestionOpen: open})
    } 

    render() {
        const showLocation = this.state.trackCurrent === true ? this.state.currentLocation : this.state.centerLocation
        const markers = this.state.locations.map((pin, index) => {
            const location = {lat: pin.latitude, lng: pin.longitude}
            return(
                <Marker
                    key={index}
                    title="Location"
                    id={index}
                    position={location}
                    draggable={false}
                    onClick={() => this.markerClickedHandler(pin, index)}
                    >
                </Marker>
            )
        }) 
        const newMarker = this.state.newMarker ? <Marker
            position={this.state.newMarker.position}
            title="New Question"
            draggable={false}
        /> : null
        const map = <Map
                        id="map-erland"
                        className="do-transition maps-relative"
                        google={this.props.google}
                        zoom={this.state.zoom}
                        center={showLocation}
                        onClick={(t, map, coord) => this.onNewMarkerClick(t, map, coord, this.state.addNewMarker)}
                    >
                        {markers}
                        {newMarker}
                        <Marker     
                            name={'Current location'} 
                            position={this.state.currentLocation} 
                            icon="static/bluecircle.png"/>
                        <Fab className="no-outline" variant="extended" aria-label="like" style={buttonStyles.fab} onClick={this.onCurrentPositionClick}>
                            <NavigationIcon style={buttonStyles.extendedIcon} />
                        </Fab>
                        <Fab className="no-outline" variant="extended" aria-label="like" style={buttonStyles.fabList} onClick={event => this.toggleDrawer(event, true)}>
                            <ListIcon style={buttonStyles.extendedIcon} />
                            Frågor
                        </Fab>
                        <AdminAddBtn toggle={this.toggleNewMarker} /> 
                        <AddQuestionDialog open={this.state.addQuestionOpen} setOpen={this.setAddQuestionOpen} marker={this.state.newMarker} /> 
                    </Map>
        return(
            <Spring
                from={{opacity: 0}}
                to={{opacity: 1}}
                >{props => (
                    <div style={props}>
                        <div style={{position: "absolute", top: 0, bottom: 56, left: 0, right: 0}}>
                            <div style={{width:"100%", height: "100%"}} ref={el => (this.container = el)}>
                                {map}
                            </div>
                            <QuestionDialog onClose={this.dialogCloseHandler} 
                                            question={this.state.activeQuestion} 
                                            open={this.state.dialogOpen} 
                                            handleAnswer={this.handleAnswerChanged} 
                                            getAnswers={this.getAnswers}
                                            answers={this.state.activeQuestion.answers}
                                            />
                            <LocationDrawer toggleDrawer={this.toggleDrawer} open={this.state.drawerOpen} pinpoints={this.state.locations} setLocation={this.drawerSelectedHandler} />
                        </div>
                    </div>
                )}
            </Spring>
        );
    }
} 

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 1000,
})(GoogleApiWrapper( { apiKey: api_key } )(Quiz));