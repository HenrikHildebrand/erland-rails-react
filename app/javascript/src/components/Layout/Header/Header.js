import React from 'react'
import Aux from '../../../hoc/Aux'
import Logo from './Logo/Logo'
import classes from './Header.module.css'

const header = (props) => (
    <Aux>
        <div className={classes.Header}>
            <Logo />
        </div>
    </Aux>
) 


export default header;