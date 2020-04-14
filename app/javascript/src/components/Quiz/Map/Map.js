import React from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';

const ubit = {lat: 57.6982853, lng: 11.9752105}
const api_key = "AIzaSyD0Mknc1_dWFz7iRLF24lVFm4edmyxw3g4";
 
export class MapContainer extends Component {
  render() {
    return (
        <div>
            <Map google={this.props.google} zoom={15} initialCenter={ubit}/>
        </div>
    );
  }
}
 
export default GoogleApiWrapper({apiKey: api_key})(MapContainer)