import React, { useEffect } from 'react'
import Aux from './hoc/Aux'
import Layout from './components/Layout/Layout'
import Main from './containers/Main/Main'

class App extends React.Component{
    render(){
        return(
            <Aux>
                <Layout>
                    <Main />
                </Layout>
            </Aux>
        );
    }
};

export default App;
