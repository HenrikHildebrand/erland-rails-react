import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import classes from './Drawer.module.css'



const drawer = (props) => {

    const select = (index) => {
        props.swipe(index)
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
            <List style={{width: 200}}>
               {props.modules.map((text, index) => (
                   <div key={index}>
                       <ListItem button onClick={() => select(index)}>
                           <ListItemText primary={text} />
                       </ListItem>
                       <Divider />   
                   </div>
               ))}                 
            </List>
        </div>
    );

    return (
        <SwipeableDrawer
            anchor="right"
            open={props.open}
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
        >
            {sideList('right')}
        </SwipeableDrawer>
    );
}

export default drawer;
