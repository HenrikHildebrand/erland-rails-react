import React, { useState, useEffect } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { geolocated } from 'react-geolocated'
import mapOptions from './mapStyles'
import ToggleDarkMode from '../Buttons/MapModeButton'

const ubit = {lat: 57.6982853, lng: 11.9752105}
const api_key = "AIzaSyD0Mknc1_dWFz7iRLF24lVFm4edmyxw3g4";

const mapContainer = (props) => {
    const [map, setMap] = useState(null)
    const [pos, setPos] = useState({})

    const {questions, center, children, google} = props

    const geoAvailable = () => (props.isGeolocationAvailable && props.isGeolocationEnabled)
  
    const setCurrentPosition = () => {
      if(geoAvailable() && props.coords){
        setPos({lat: props.coords.latitude, lng: props.coords.longitude})
      } 
    }

    const extractPosition = (question) => (
      {
        lat: question.attributes.lat,
        lng: question.attributes.lng,
      }
    ) 

    useEffect(() => {
        if(map && map.map){
            map.map.setOptions(mapOptions.dark);
        } 
    }, [map])

    useEffect(() => {
      setCurrentPosition()  
    }, [props.coords])


    // pan to new position
    useEffect(() => {
        if(map){
            map.map.panTo(center)
            const zoomFluid = map.map.getZoom()
            zoomTo(zoomFluid);
        } 
    },[center])

    useEffect(() => {
        if(map){
            try {
              map.map.panTo(pos)
              const zoomFluid = map.map.getZoom()
              zoomTo(zoomFluid);
            } catch (error) {
              console.log("ERROR: ", error)
            }
        } 
    },[props.trackCurrentPosition])

    const zoomTo = (zoom) => {
      if(zoom >= 15){
        return 0;
      } 
      else {
        map.map.setZoom(zoom + 1);
        setTimeout(() => zoomTo(zoom + 1), 50);
      }
    }

    const toggleDarkMode = (index) => {
        map.map.setOptions( index % 2 === 0 ? mapOptions.dark : mapOptions.light );
    }

    return(
        <div>
            <Map
                id="map-erland"
                google={google}
                zoom={15}
                ref={(m) => {setMap(m);}}
                initialCenter={ubit}
                zoomControl={false}
                streetViewControl={false}
            >
                {children}
                {
                    questions.map((question, index) => (
                        <Marker
                            key={index}
                            onClick={() => props.markerClick(question)}
                            position={extractPosition(question)}
                            draggable={false}
                            icon="http://maps.google.com/mapfiles/ms/micons/question.png"
                        />
                    ))
                }
                <Marker
                    name={'Current location'}  
                    position={pos} 
                    icon="static/bluecircle.png" />
                <ToggleDarkMode toggle={toggleDarkMode} />
                
            </Map>
        </div>
    );
}

export default geolocated({
    watchPosition: true,
    userDecisionTimeout: 1000,
})(GoogleApiWrapper( { 
  apiKey: api_key 
} )(mapContainer));
