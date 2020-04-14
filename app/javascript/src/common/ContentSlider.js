import React, { Component, Suspense, lazy } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Swiper from './Swiper'

const Leaderboard = lazy(() => import('./drinks/Leaderboard'))


class ContentSlider extends Component {

    state = {
        loaded: true
    }

    componentDidMount() {

    }


    render(){

        return(
            <div>
                <Swiper>
                    <div label="Drinks" style={{minHeight: 'fit-content'}}>
                        <Suspense fallback={<CircularProgress />}>
                            <Leaderboard />
                        </Suspense>
                    </div>
                    <div label="Other">
                        <Suspense fallback={<CircularProgress />}>
                            <h3>Other stuff</h3>
                        </Suspense>
                    </div>
                </Swiper>
            </div>
        );
    }
}



import { connect } from "react-redux";
import { update } from "../actions/stateActions"

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

export default connect(mapStateToProps, mapDispatchToProps)(ContentSlider);
