import React, { useState, useEffect } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { geolocated } from 'react-geolocated'

const ubit = {lat: 57.6982853, lng: 11.9752105}
const api_key = "AIzaSyD0Mknc1_dWFz7iRLF24lVFm4edmyxw3g4";

const mapContainer = (props) => {
    const [map, setMap] = useState(null)
    const [pos, setPos] = useState({})

    const {questions, center, children, google} = props

    const geoAvailable = () => (props.isGeolocationAvailable && props.isGeolocationEnabled)
  
    const setCurrentPosition = () => {
        if(geoAvailable() && props.coords) setPos({lat: props.coords.latitude, lng: props.coords.longitude})
    }

    useEffect(() => {
        setInterval(()=>{
            setCurrentPosition()
        }, 1000)
    }, [])


    // pan to new position
    useEffect(() => {
        if(map){
            console.log("pan to questions")
            map.map.panTo(center)
        } 
    },[center])

    useEffect(() => {
        console.log("trakc current changed")
        if(map){
            console.log("pan to current")
            map.map.panTo(pos)
        } 
    },[props.trackCurrentPosition])


    return(
        <div>
            <Map
                id="map-erland"
                google={google}
                zoom={15}
                ref={(m) => setMap(m)}
                initialCenter={ubit}
            >
                {children}
                {
                    questions.map((question, index) => (
                        <Marker
                            key={index}
                            onClick={() => props.markerClick({open: true, index: index})}
                            position={question.position}
                            draggable={false}
                        />
                    ))
                }
                <Marker
                    name={'Current location'}  
                    position={pos} 
                    icon="static/bluecircle.png" />
                
            </Map>
        </div>
    );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    watchPosition: true,
    userDecisionTimeout: 500,
})(GoogleApiWrapper( { apiKey: api_key } )(mapContainer));