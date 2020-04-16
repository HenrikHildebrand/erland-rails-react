import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import styles from './styles'



const drawer = (props) => {
    const classes = styles();
    const sideList = side => (
        <div
            style={{padding: 10, minWidth: 200}}
            className={classes.list}
            role="presentation"
            // onClick={(event) => props.toggleDrawer(event, false)}
            onKeyDown={(event) => props.toggleDrawer(event, false)}
        >
            <h3>här tänkte jag lägga in lite öl typ...</h3>
        </div>
    );

    return (
        <SwipeableDrawer
            anchor="left"
            open={props.open}
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
            classes={{paper: classes.rounded}}
        >
            {sideList('left')}
        </SwipeableDrawer>
    );
}

export default drawer;
