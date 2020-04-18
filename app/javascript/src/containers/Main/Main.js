import React from 'react'
import Aux from '../../hoc/Aux'
import Swiper from '../../components/UI/Swiper/Swiper'

import {getHeader, OK} from '../../components/Requests/requests'
import Leaderboard from '../../views/Leaderboard';
import Quiz from '../../views/Quiz';

class Main extends React.Component {
    state = {
        loaded: false,
        navOpen: false,
        persons: [],
        questions: []
    }

    componentDidMount = () => {
        this.fetchUsers();
        this.fetchQuestions();
    }

    fetchUsers = (namespace='v1') => {
        console.log(this.props)
        fetch(`/${namespace}/events/${this.props.state.currentEvent.id}/participants`,{headers: getHeader()})
            .then(response => {if(response.status === OK) return(response.json())})
            .then(response => {
                console.log(response)
                this.setState({persons: response.data})
            })
    }

    fetchQuestions = (namespace='v1') => {
        fetch(`/${namespace}/events/${this.props.state.currentEvent.id}/questions`,{headers: getHeader()})
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
                    <Leaderboard persons={this.state.persons} user={this.props.user}/>
                    <Quiz questions={this.state.questions}/>
                </Swiper>
            </Aux>
        )
    }
}



import { connect } from "react-redux";
import { update } from "../../actions/stateActions"

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
