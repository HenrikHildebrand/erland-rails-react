import React from 'react'
import Swiper from '../../components/UI/Swiper/Swiper'
import Events from '../../components/Events/Events'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'
import EventsSkeleton from '../../components/Events/EventsSkeleton'

import Swal from 'sweetalert2'
import {getHeader, OK} from '../../components/Requests/requests'
import Skeleton from '@material-ui/lab/Skeleton';

class EventsSelector extends React.Component {

    state = {
        loaded: false,
        showSkeleton: true,
        showEvents: false,
        userEvents: [],
        publicEvents: []
    }

    componentDidMount = () => {
        this.fetchEvents()
        
    }

    fetchEvents = (namespace='v1') => {
        return (
            fetch(`/${namespace}/events`, {header: getHeader()})
            .then(response => {
                if(response.status === OK) return(response.json())
            })
            .then(response => {
                console.log(response)
                console.log(response.my_events)

                this.toggleSkeleton(false)
                this.setEvents(response)
            })


        )
    }

    setEvents = (response) => {
        setTimeout(() => {
            this.setState({
                loaded: true,
                showEvents: true,
                userEvents: response.my_events,
                publicEvents: response.all_events
            })
        },600)
    }

    toggleSkeleton = (value) => {
        setTimeout(()=>{
            this.setState({showSkeleton: value})
        }, 400)
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

    selectHandler = (event) => {
        this.setState({showEvents: false})
        setTimeout(()=>{
            this.props.select(event)
        }, 500)


    }

    render(){
        if(this.state.loaded){
            return(
                <Swiper
                    index={this.props.index} 
                    swipe={this.props.swipe}
                >
                    <Fade in={this.state.showEvents} timeout={400} mountOnEnter unmountOnExit >
                        <div>
                            <Events label="Publika" events={this.state.publicEvents}  select={this.selectHandler} request={this.requestHandler}/>
                        </div>
                    </Fade>
                    <Fade in={this.state.showEvents} mountOnEnter unmountOnExit >
                        <div>
                            <Events label="Mina" events={this.state.userEvents} select={this.selectHandler} request={this.requestHandler}/>
                        </div>
                    </Fade>
                </Swiper>
                 
            );
        } else return(
            <Fade in={this.state.showSkeleton} timeout={400} unmountOnExit >
                <div>
                    <Skeleton style={{margin: 'auto'}} animation="wave" width='50%' height={40} />
                    <EventsSkeleton />
                </div>                         
            </Fade>
        )
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

