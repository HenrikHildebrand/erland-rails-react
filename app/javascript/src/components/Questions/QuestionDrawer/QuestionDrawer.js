import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer/index';
import List from '@material-ui/core/List/index';
import ListItem from '@material-ui/core/ListItem/index';
import ListItemText from '@material-ui/core/ListItemText/index';
import RoomIcon from '@material-ui/icons/Room';
import Divider from '@material-ui/core/Divider/index';
import styles from './styles'
import Aux from '../../../hoc/Aux'

const extractPosition = (question) => (
  {
    lat: question.attributes.lat,
    lng: question.attributes.lng,
  }
) 

const questionDrawer = (props) => {     
  const classes = styles();

  const onSelect = (position) => {
    console.log("pos is:", position)
    props.setCenter(position)
    props.setOpen(false)
  }


  const fullList = () => (
    <div
      className={classes.fullList}
      role="presentation"
    //   onKeyDown={(event) => props.toggleDrawer(event, false)}
    >
      <List>
        {props.questions.map((question, index) => (
            <Aux key={index}>
                <ListItem button onClick={() => onSelect(extractPosition(question))}>
                    <RoomIcon />
                    <ListItemText primary={question.attributes.title} />
                </ListItem>
                <div style={{width: "90%", margin: "auto"}}>
                    {index !== props.questions.length-1 ? <Divider /> : null }
                </div>
            </Aux>
        ))}
      </List>
    </div>
  );
  return(
    <Aux>
      <SwipeableDrawer
        elevation={20}
        anchor="bottom"
        open={props.open}
        onClose={() => props.setOpen(false)}
        onOpen={() => props.setOpen(true)}
        PaperProps={{square: false}}
        classes={{paper: classes.rounded}}
      >
        <div className={classes.container}>
          {fullList()}
        </div>
      </SwipeableDrawer>
    </Aux>
  );
}

export default questionDrawer;