import React, { useEffect } from 'react'
import Layout from './components/Layout/Layout'
import Main from './containers/Main/Main'
import EventSelector from './containers/EventsSelector/EventsSelector'
import { getHeader, OK} from './components/Requests/requests'
import { connect } from "react-redux";
import { update } from "./actions/stateActions"
import Swal from 'sweetalert2'

const modules = ['Leaderboard', 'Quiz']

const eventModules = ['Publika Event', 'Mina Event']

class App extends React.Component{
    state = {
        index: 0,
    }

    componentDidMount = () => {
        console.log("User: ", this.props.user)
        localStorage.setItem("auth", JSON.stringify(
            {
                'X-User-Email': this.props.user.email,
                'X-User-Token': this.props.user.authentication_token
            }
        ))
    }

    swipeHandler = (index) => {
        this.setState({index: index})
    }

    logout = () => {
        this.props.updateState({
            currentEvent: initEvent,
            eventSelected: false
        })
        localStorage.setItem("auth", null)
        window.location.href = '/signed_out'
    }

    selectEventHandler = (event, namespace='v1') => {
        fetch(`/${namespace}/events/${event.id}/join`, {method: 'POST', headers: getHeader()})
            .then(response => {
                if (response.status === OK){
                    this.props.updateState({
                        currentEvent: event,
                        eventSelected: true,
                        index: 0
                    })
                } else {
                    Swal.fire({
                        title: 'Något gick fel!',
                        text: 'Gick inte att joina event... :(',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                }
            })
    } 

    leaveEventHandler = (event) => {
        this.props.updateState({
            currentEvent: initEvent,
            eventSelected: false
        })
    }

    render(){
        if (this.props.state.eventSelected){
            return(
                <Layout 
                    swipe={this.swipeHandler} 
                    index={this.state.index} 
                    modules={modules} 
                    leave={this.leaveEventHandler} 
                    logout={this.logout}
                >
                    <Main 
                        swipe={this.swipeHandler} 
                        index={this.state.index}    
                        user={this.props.user} />
                </Layout>
            );
        } else {
            return(
                <Layout 
                    swipe={this.swipeHandler} 
                    index={this.state.index} 
                    modules={eventModules} 
                    logout={this.logout}
                >
                    <EventSelector 
                        swipe={this.swipeHandler} 
                        index={this.state.index} 
                        select={this.selectEventHandler}/>
                </Layout>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return { ...state }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (currentUser) => { dispatch(update.user(currentUser)) },
        updateState: (state) => {
            console.log("[App.js] dispatch")
            dispatch(update.state(state))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



const initEvent = {
    "id": null,
    "title": null,
    "date": null,
    "admin_id": null,
    "invite_only": null,
    "is_public": null,
    "initial_credits": null
};