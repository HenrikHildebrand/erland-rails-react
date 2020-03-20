import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles({
  card: {
    width: 345,
    height: 200,
    margin: "10px auto 10px auto",
    cursor: "pointer"
  },
  add: {
      height: "100%",
      width: "100%",
      backgroundColor: "#eee",
  },
  circleDiv: {
    padding: 20,
  },
  circle: {
    width: 90,
    margin:"auto"
  },
  textDiv: {
    width: "100%",
    color: "#aaa",
  }
  
});

const EventCard = (props) => {
  const classes = useStyles();
  return (
    <div className="do-transition" onClick={props.click}>
      <Card className={classes.card}>
          <div className={classes.add}>
                <div className={classes.circleDiv}>
                    <div className={classes.circle}>
                        <div className="add-event-circle" />
                    </div>
                </div>
                <div className={classes.textDiv}>
                    <h4 style={{width: "100%", textAlign: "center"}}>Skapa nytt event</h4>
                </div>
          </div>
      </Card>
    </div>
  );
}

export default EventCard;