import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Leaderboard from './drinks/Leaderboard'
import Swiper from './common/Swiper'



class ContentSlider extends Component {

    state = {
        loaded: true
    }

    componentDidMount() {

    }


    render(){

        return(
            <div>
                { this.state.loaded ?

                    <Swiper>
                        <div label="Drinks" style={{minHeight: 'fit-content'}}>
                            <Leaderboard />
                        </div>
                        <div label="Other">
                            <h3>Other stuff</h3>
                        </div>
                    </Swiper>
                    : <CircularProgress />
                }
            </div>
        );
    }
}



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

export default connect(mapStateToProps, mapDispatchToProps)(ContentSlider);