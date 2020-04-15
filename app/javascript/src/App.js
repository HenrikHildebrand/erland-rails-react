import React, { useEffect } from 'react'
import Aux from './hoc/Aux'
import Layout from './components/Layout/Layout'
import Main from './containers/Main/Main'

const modules = ['Leaderboard', 'Leaderboard-suspense', 'Quiz']

class App extends React.Component{
    state = {
        index: 0
    }

    swipeHandler = (index) => {
        this.setState({index: index})
    }

    render(){
        return(
            <Aux>
                <Layout swipe={this.swipeHandler} index={this.state.index} modules={modules} >
                    <Main swipe={this.swipeHandler} index={this.state.index}/>
                </Layout>
            </Aux>
        );
    }
};

export default App;
