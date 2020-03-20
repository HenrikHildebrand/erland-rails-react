import React, { useEffect } from 'react'
import Swiper from './common/Swiper'
import Slide from '@material-ui/core/Slide';
import EventSlider from './events/EventSlider'

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
        loaded: false
    }

    componentDidMount() {
        this.setState({
            loaded: true,
            user: this.props.user
        })
    }

    getAuth = () => (
        {
            'X-User-Email': this.state.user.email,
            'X-User-Token': this.state.user.authentication_token
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
            this.setState({loaded: false});
            window.location = "/signed_out"
        })
    }

    render(){
        return(
            <EventSlider />
        )
    }
}

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
