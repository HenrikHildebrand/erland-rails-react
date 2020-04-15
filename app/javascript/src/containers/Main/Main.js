import React, { useEffect, lazy, Suspense } from 'react'
// import { BrowserRouter as Router, Route } from "react-router-dom"
import Aux from '../../hoc/Aux'
import Swiper from '../../components/UI/Swiper/Swiper'
import CircularProgress from '@material-ui/core/CircularProgress';

const Leaderboard = lazy(()=>import('../../components/Leaderboard/Leaderboard'));
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
                    <Suspense fallback={<CircularProgress />}><Leaderboard /></Suspense>
                    <Suspense fallback={<CircularProgress />}><Quiz /></Suspense>
                </Swiper>
            </Aux>
        )
    }
}


export default App;
