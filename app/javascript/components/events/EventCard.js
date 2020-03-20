import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: 345,
    margin: "10px auto 10px auto"
  },
  media: {
    height: 100,
  },
});

const EventCard = (props) => {
  const classes = useStyles();
  var date, time;
  if(props.date !== null){
    date = props.date.split('T')[0]
    time = props.date.split('T')[1].split(':').splice(0, 2).join(':')
  }
  return (
    <div className="do-transition">
      <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={"static/cardcover.jpg"}
            title="janne"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography covariant="body2" style={{color: props.invite_only ? "red" : "green"}} component="p">
                {props.invite_only ? "Ḱräver inbjudan" : "Öppen"}
            </Typography>
            <Typography covariant="body2" style={{color: "gray"}} component="p">
                {props.date ? date  + " " + time : null}
            </Typography>
          </CardContent>
        <CardActions>
          { ((!props.invite_only && props.public) || props.admin) ?  
          <Button className="no-outline" size="small" color="primary" onClick={() => props.handleSelect(props.id, props.admin)}>
            Välj
          </Button> : null}
          { !props.invite_only && !props.public ? <Button className="no-outline" size="small" color="primary" onClick={() => props.handleRequest(props.id, props.index)}>
            Skicka förfrågan
          </Button> : null }
        </CardActions>
      </Card>
    </div>
  );
}

export default EventCard;