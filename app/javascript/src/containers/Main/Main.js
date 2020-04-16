import React from 'react'
// import { BrowserRouter as Router, Route } from "react-router-dom"
import Aux from '../../hoc/Aux'
import Swiper from '../../components/UI/Swiper/Swiper'
import CircularProgress from '@material-ui/core/CircularProgress';

import {getHeader, OK} from '../../components/Requests/requests'
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Quiz from '../../components/Quiz/Quiz';

class Main extends React.Component {
    state = {
        loaded: false,
        navOpen: false,
        persons: [],
        questions: []
    }

    componentDidMount = () => {
        this.fetchUsers();
    }

    fetchUsers = (namespace='v1') => {
        console.log(this.props)
        fetch(`/${namespace}/events/${this.props.event.id}/participants`,{headers: getHeader()})
            .then(response => {if(response.status === OK) return(response.json())})
            .then(response => {
                console.log(response)
                this.setState({persons: response.data})
            })
    }

    fetchQuestions = () => {
        fetch(`/events/${this.props.event.id}/participants`,{headers: getHeader()})
            .then(response => {if(response.status === OK) return(response.json())})
            .then(response => {
                this.setState({questions: response.data})
            })
    }

    render(){   
        return(
            <Aux>
                <Swiper 
                    index={this.props.index} 
                    swipe={this.props.swipe} 
                >
                    <Leaderboard persons={this.state.persons}/>
                    <Quiz questions={this.state.questions}/>
                </Swiper>
            </Aux>
        )
    }
}


export default Main;
