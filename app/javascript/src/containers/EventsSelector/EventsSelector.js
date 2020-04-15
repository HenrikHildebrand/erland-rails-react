import React from 'react'
import Swiper from '../../components/UI/Swiper/Swiper'
import Events from '../../components/Events/Events'
import Aux from '../../hoc/Aux'

import Swal from 'sweetalert2'
import requests from './requests'

class EventsSelector extends React.Component {

    state = {
        userEvents: events,
        publicEvents: events
    }

    requestHandler = (event) => {
        Swal.fire({
            title: 'Ej tillgänglig!',
            text: 'Kommer snart...',
            icon: 'error',
            showConfirmButton: false,
            timer: 3000,
          })
    } 

    render(){
        return(
            <Aux>
                <Swiper
                    index={this.props.index} 
                    swipe={this.props.swipe}
                >
                    <Events label="Mina" events={this.state.userEvents} select={this.props.select} request={this.requestHandler}/>
                    <Events label="Publika" events={this.state.publicEvents}  select={this.props.select} request={this.requestHandler}/>
                </Swiper>
            </Aux>
        );
    }
}

export default EventsSelector;







const events = [
    {
        "id": 5,
        "title": "sdgj",
        "date": "2015-01-01T00:00:00.000Z",
        "admin_id": null,
        "created_at": "2020-03-23T13:07:04.676Z",
        "updated_at": "2020-03-23T13:07:04.676Z",
        "invite_only": null,
        "is_public": null,
        "initial_credits": 5
    },
    {
        "id": 6,
        "title": "sdfsldfg",
        "date": "2015-01-01T00:00:00.000Z",
        "admin_id": null,
        "created_at": "2020-03-23T13:07:18.087Z",
        "updated_at": "2020-03-25T16:24:45.054Z",
        "invite_only": false,
        "is_public": false,
        "initial_credits": 5
    },
    {
        "id": 4,
        "title": "Henriks nya event123",
        "date": "2022-03-05T05:11:00.000Z",
        "admin_id": 7,
        "created_at": "2020-03-21T16:38:36.727Z",
        "updated_at": "2020-04-07T07:06:05.904Z",
        "invite_only": false,
        "is_public": true,
        "initial_credits": 5
    }
]

