import React, { useEffect } from 'react'
import Aux from './hoc/Aux'
import Layout from './components/Layout/Layout'
import Main from './containers/Main/Main'
import EventSelector from './containers/EventsSelector/EventsSelector'

const modules = ['Leaderboard', 'Quiz']

class App extends React.Component{
    state = {
        index: 0,
    }

    componentDidMount = () => {
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

    selectEventHandler = (event) => {
        this.props.updateState({
            currentEvent: event,
            eventSelected: true,
            index: 0
        })
    } 

    leaveEventHandler = (event) => {
        this.setState({
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
                >
                    <Main swipe={this.swipeHandler} index={this.state.index} event={this.props.state.currentEvent} />
                </Layout>
            );
        } else {
            return(
                <Layout 
                    swipe={this.swipeHandler} 
                    index={this.state.index} 
                    modules={modules} 
                >
                    <EventSelector swipe={this.swipeHandler} index={this.state.index} select={this.selectEventHandler}/>
                </Layout>
            )
        }
    }
};


import { connect } from "react-redux";
import { update } from "./actions/stateActions"

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