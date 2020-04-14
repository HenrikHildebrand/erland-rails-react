import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { geolocated } from "react-geolocated";

const ubit = {lat: 57.6982853, lng: 11.9752105}
const api_key = "AIzaSyD0Mknc1_dWFz7iRLF24lVFm4edmyxw3g4";

const map = (props) => {
    return(
        <Map
            id="map-erland"
            google={props.google}
            zoom={15}
            center={ubit}
            // onClick={(t, map, coord) => this.onNewMarkerClick(t, map, coord, this.state.addNewMarker)}
        >
            {props.children}
        </Map>

    );
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 1000,
})(GoogleApiWrapper( { apiKey: api_key } )(map));