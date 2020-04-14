import React, { useEffect } from 'react'
// import { BrowserRouter as Router, Route } from "react-router-dom"
import Aux from '../../hoc/Aux'
import Leaderboard from '../../components/Leaderboard/Leaderboard'
import Swiper from '../../components/Swiper/Swiper'

class App extends React.Component {
    state = {
        loaded: false,
        navOpen: false,
    }

    render(){   
        return(
            <Aux>
                <Swiper index={this.props.index} swipe={this.props.swipe}>
                    <Leaderboard /> 
                    <div>
                        <h1>Other stuff</h1>
                    </div>
                </Swiper>
            </Aux>
        )
    }
}


export default App;
