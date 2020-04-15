import React, { useEffect } from 'react'
import Aux from './hoc/Aux'
import Layout from './components/Layout/Layout'
import Main from './containers/Main/Main'
import EventSelector from './containers/EventsSelector/EventsSelector'

const modules = ['Leaderboard', 'Quiz']

class App extends React.Component{
    state = {
        index: 0,
        currentEvent: initEvent,
        eventSelected: false
    }

    swipeHandler = (index) => {
        this.setState({index: index})
    }

    selectEventHandler = (event) => {
        this.setState({
            currentEvent: event,
            eventSelected: true
        })
    } 

    leaveEventHandler = (event) => {
        this.setState({
            currentEvent: initEvent,
            eventSelected: false
        })
    }

    render(){
        if (this.state.eventSelected){
            return(
                <Layout 
                    swipe={this.swipeHandler} 
                    index={this.state.index} 
                    modules={modules} 
                    leave={this.leaveEventHandler} 
                >
                    <Main swipe={this.swipeHandler} index={this.state.index} event={this.state.event} />
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

export default App;


const initEvent = {
    "id": null,
    "title": null,
    "date": null,
    "admin_id": null,
    "invite_only": null,
    "is_public": null,
    "initial_credits": null
};