import React from 'react'
import Aux from '../../../hoc/Aux'
import Logo from './Logo/Logo'
import styles from './styles'

const header = (props) => {
    const classes = styles()
    return(
        <Aux>
            <div className={classes.Header}>
                <Logo />
            </div>
        </Aux>
    );
}

export default header;