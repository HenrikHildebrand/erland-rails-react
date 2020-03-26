import React, { useEffect } from 'react'
import Swiper from './common/Swiper'
import Slide from '@material-ui/core/Slide';
import EventSlider from './events/EventSlider'
import MenuButton from './navigation/MenuButton'
import RightDrawer from './navigation/RightDrawer'
import { BrowserRouter as Router, Route } from "react-router-dom"
import ContentSlider from './ContentSlider'
import './stylesheets/app.scss'

const styles = {
    body: {
        height: '100%'
    },
    container: {
        width: '100%',
        padding: 20,
        marginTop: 20,
        bottom: 0
    },
    logout: {
        color: 'white'
    }
}

class App extends React.Component {
    state = {
        loaded: false,
        navOpen: false
    }

    componentDidMount() {
        this.setState({
            loaded: true,
            user: this.props.user
        })
        this.props.updateState({
            user: this.props.user,
            auth: this.getAuth(),
            authenticated: true
        })
        console.log(this.props.state.user)
    }

    getAuth = () => (
        {
            'X-User-Email': this.props.user.email,
            'X-User-Token': this.props.user.authentication_token
        }
    )
    logout = () => {
        fetch('/users/sign_out', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...this.getAuth()
            }
        }).then(()=> {
            this.setState({loaded: false, navOpen: false});
            this.props.updateState({event: false, auhenticated: false, loaded: false})
            window.location = "/signed_out"
        })
    }

    toggleDrawer = (event, open) => {
        console.log('hej', open)
        
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        console.log('hej2')
        this.setState({ ...this.state, navOpen: open });
    };

    leaveParty = () => {
        this.props.updateState({event:false})
        this.setState({navOpen: false})
    }

    isReady = () => (this.props.state.loaded && this.props.state.event && this.props.state.event.selected)

    render(){
        return(
            <div>
                {this.state.loaded ?
                    <div>
                        <Router>
                            { this.isReady() ?
                                <ContentSlider />
                            :   <EventSlider loaded={this.state.loaded} />
                            }

                            <MenuButton click={this.toggleDrawer} open={this.state.navOpen} loaded={this.state.loaded}/>
                            <RightDrawer leave={this.leaveParty}
                                         toggleDrawer={this.toggleDrawer}
                                         open={this.state.navOpen}
                                         logout={this.logout}
                                         authenticated={this.props.state.authenticated}
                                         img={{url: this.props.state.user.image}} />
                        </Router>
                    </div>

                : null}
            </div>


        )
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
