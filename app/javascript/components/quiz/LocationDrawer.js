import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});


const SwipeableTemporaryDrawer = (props) => {
  const classes = useStyles();
  const fullList = () => (
    <div
      className={classes.fullList}
      role="presentation"
    //   onKeyDown={(event) => props.toggleDrawer(event, false)}
    >
      <List>
        {props.pinpoints.map((pin, index) => (
          <ListItem button key={index} onClick={(event) => props.setLocation(event, {lat: pin.latitude, lng: pin.longitude})}>
            <RoomIcon />
            <ListItemText primary={pin.title} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return(
    <div>
      <div style={{
        position: "absolute",
        width: "50px",
        height: "50px", 
        top: "-500px", 
        left: "100px",
        zIndex: 9999,
        backgroundColor: "#fff"
    }}></div>
      <SwipeableDrawer
        anchor="bottom"
        open={props.open}
        onClose={(event) => props.toggleDrawer(event, false)}
        onOpen={(event) => props.toggleDrawer(event, true)}
      >
        <div style={{overflowY: "scroll", maxHeight: 400}}>
          {fullList()}
        </div>
      </SwipeableDrawer>
    </div>
  );
}

export default SwipeableTemporaryDrawer;