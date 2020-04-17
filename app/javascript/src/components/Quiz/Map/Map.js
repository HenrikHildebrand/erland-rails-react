import React, { useState, useEffect } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { geolocated } from 'react-geolocated'
import QuestionMarker from '@material-ui/icons/NotListedLocationRounded'

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
        if(map && map.map){
            console.log("setting map options")
            map.map.setOptions(mapOptions);
        } 
    }, [map])

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
                ref={(m) => {setMap(m);}}
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
                            icon="http://maps.google.com/mapfiles/ms/micons/question.png"
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


const myStyles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

const mapOptions = {
    styles: myStyles 
};