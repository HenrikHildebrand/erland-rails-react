import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Aux from '../../hoc/Aux'

class App extends React.Component {
    state = {
        loaded: false,
        navOpen: false
    }

    // componentDidMount() {
    //     this.setState({
    //         loaded: true,
    //         user: this.props.user
    //     })
    //     this.props.updateState({
    //         user: this.props.user,
    //         auth: this.getAuth(),
    //         authenticated: true
    //     })
    //     console.log(this.props.state.user)
    // }

    // getAuth = () => (
    //     {
    //         'X-User-Email': this.props.user.email,
    //         'X-User-Token': this.props.user.authentication_token
    //     }
    // )
    // logout = () => {
    //     fetch('/users/sign_out', {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             ...this.getAuth()
    //         }
    //     }).then(()=> {
    //         this.setState({loaded: false, navOpen: false});
    //         this.props.updateState({event: false, auhenticated: false, loaded: false})
    //         window.location = "/signed_out"
    //     })
    // }

    // toggleDrawer = (event, open) => {
    //     console.log('hej', open)
        
    //     if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //         return;
    //     }
    //     console.log('hej2')
    //     this.setState({ ...this.state, navOpen: open });
    // };

    // leaveParty = () => {
    //     this.props.updateState({event:false})
    //     this.setState({navOpen: false})
    // }

    // isReady = () => (this.props.state.loaded && this.props.state.event && this.props.state.event.selected)

    render(){
        return(
            <Aux>
                <h2>Hello</h2>
            </Aux>
        )
    }
}


export default App;
