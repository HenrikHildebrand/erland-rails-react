import React from 'react'
import Fab from '@material-ui/core/Fab/index';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Zoom from '@material-ui/core/Zoom/index';

import classes from './MenuButton.module.css';


const menuButton = (props) => (
    <Zoom in={props.loaded} style={{ transitionDelay: props.loaded ? '500ms' : '0ms' }}>
        <Fab 
            color="primary" 
            aria-label="add" 
            onClick={() => props.setOpen(!props.open)} 
            className={classes.Fab}
        >
            <MenuRoundedIcon className={classes.Icon} />
        </Fab>
    </Zoom>
)

export default menuButton;