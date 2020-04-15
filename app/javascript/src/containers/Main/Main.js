import React, { useEffect, lazy, Suspense } from 'react'
// import { BrowserRouter as Router, Route } from "react-router-dom"
import Aux from '../../hoc/Aux'
import Swiper from '../../components/UI/Swiper/Swiper'
import CircularProgress from '@material-ui/core/CircularProgress';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

const Quiz = lazy(() => import('../../components/Quiz/Quiz'));

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
                    <Leaderboard timeout={1000}/>
                    <Suspense fallback={<CircularProgress />} >
                        <Quiz />
                    </Suspense>
                </Swiper>
            </Aux>
        )
    }
}


export default App;
