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

    const sideList = side => (
        <div
            style={{padding: 10, minWidth: 200}}
            className={classes.list}
            role="presentation"
            // onClick={(event) => props.toggleDrawer(event, false)}
            onKeyDown={(event) => props.toggleDrawer(event, false)}
        >

            {/* <img src={props.img.url} style={styles.img} className="rounded-circle erland-thumb" alt="profile_img" /> */}
            <Divider />
            {/*<List style={{width: 200}}>*/}
            {/*    {[['Dryck','/beer'], ['Min dryck', '/my-drinks'], ['Sångbok','/songs'], ['Quiz','/quiz'], ['Fakta','/facts']].map((text, index) => (*/}
            {/*        <Link key={index} to={text[1]} onClick={event => props.toggleDrawer(event, false)} >*/}
            {/*            <ListItem button key={index}>*/}
            {/*                <ListItemText primary={text[0]} />*/}
            {/*            </ListItem>*/}
            {/*        </Link>*/}

            {/*    ))}*/}
            {/*</List>*/}
            {props.authenticated ?
                <div>
                    <Divider />
                    <List>
                        <Link to="/" onClick={props.leave}>
                            <ListItem button key={7} >
                                <ExitToAppIcon />
                                <ListItemText primary="Lämna fest"/>
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        {/*<Link to="/edit" onClick={event => props.toggleDrawer(event, false)}>*/}
                        {/*    <ListItem button key={8} >*/}
                        {/*        <AccountBoxIcon/>*/}
                        {/*        <ListItemText primary="Konto"/>*/}
                        {/*    </ListItem>*/}
                        {/*</Link>*/}
                        <ListItem button key={9}>
                            <ExitToAppIcon />
                            <ListItemText primary="Logga ut" onClick={props.logout} />
                        </ListItem>
                    </List>
                </div> : null}
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
