import React from 'react'
// import { BrowserRouter as Router, Route } from "react-router-dom"
import Aux from '../../hoc/Aux'
import Swiper from '../../components/UI/Swiper/Swiper'
import CircularProgress from '@material-ui/core/CircularProgress';

import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Quiz from '../../components/Quiz/Quiz';

class App extends React.Component {
    state = {
        loaded: false,
        navOpen: false,
    }

    render(){   
        return(
            <Aux>
                <Swiper 
                    index={this.props.index} 
                    swipe={this.props.swipe} 
                >
                    <Leaderboard />
                    <Quiz />
                </Swiper>
            </Aux>
        )
    }
}


export default App;
