import React from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';
import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';

const ubit = {lat: 57.6982853, lng: 11.9752105}
const api_key = "AIzaSyD0Mknc1_dWFz7iRLF24lVFm4edmyxw3g4";
 
class MapContainer extends React.Component {
  render() {
    return (
        <div>
            <ErrorBoundary>
                <Map google={this.props.google.hej.hej} zoom={15} initialCenter={ubit} >
                    {this.props.children}
                </Map>
            </ErrorBoundary>
        </div>
    );
  }
}
 
export default GoogleApiWrapper({apiKey: api_key})(MapContainer)