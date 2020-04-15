import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { geolocated } from "react-geolocated";

const ubit = {lat: 57.6982853, lng: 11.9752105}
const api_key = "AIzaSyD0Mknc1_dWFz7iRLF24lVFm4edmyxw3g4";

class MapContainer extends React.Component {
    
    render(){
        return(
            <div>
                <Map
                    id="map-erland"
                    google={this.props.google}
                    zoom={15}
                    initialCenter={ubit}
                    center={this.props.center}
                >
                    {this.props.children}
                    {
                        this.props.questions.map((question, index) => (
                            <Marker
                                key={index}
                                onClick={()=>this.props.markerClick({open: true, index: index})}
                                position={question.position}
                                draggable={false}
                            />
                        ))
                    }
                </Map>
            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    watchPosition: true,
    userDecisionTimeout: 1000,
})(GoogleApiWrapper( { apiKey: api_key } )(MapContainer));