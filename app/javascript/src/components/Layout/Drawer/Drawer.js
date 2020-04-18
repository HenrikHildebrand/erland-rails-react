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
    const select = (index) => {
        props.swipe(index)
        props.setOpen(false);
    }

    const leave = (index) => {
        props.leave(index)
        props.setOpen(false);
    }

    const sideList = side => (
        <div
            style={{padding: 10, minWidth: 200}}
            className={classes.list}
            role="presentation"
            // onClick={(event) => props.toggleDrawer(event, false)}
            onKeyDown={(event) => props.toggleDrawer(event, false)}
        >
            <List style={{width: 200, margin: 0}}>
                <img style={{width: "100%", margin: 10}} alt="erland-logo" src="static/erland.png" />
                <Divider />   
                <Divider />   
               {props.modules.map((text, index) => (
                   <div key={index}>
                       <ListItem button onClick={() => select(index)}>
                           <ListItemText primary={text} />
                       </ListItem>
                       <Divider />   
                   </div>
               ))}           
               <Divider />   
               <ListItem button onClick={leave}>
                   <ExitToAppIcon />
                    <ListItemText primary="Lämna" />
                </ListItem>
               <Divider />   
                <ListItem button onClick={props.logout}>
                    <ListItemText primary="Logga ut" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <SwipeableDrawer
            anchor="right"
            open={props.open}
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
            classes={{paper: classes.rounded}}
        >
            {sideList('right')}
        </SwipeableDrawer>
    );
}

export default drawer;
