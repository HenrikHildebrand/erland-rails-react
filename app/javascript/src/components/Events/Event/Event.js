import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles'

const EventCard = ({ event, select, request }) => {
  const classes = styles();
  
  var date, time;
  if(event.date !== null){
    date = event.date.split('T')[0]
    time = event.date.split('T')[1].split(':').splice(0, 2).join(':')
  }
  return (
      <div>
        <Card className={classes.card} elevation={3}>
            <CardMedia
            className={classes.media}
            image={"static/cardcover.jpg"}
            title="erland"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {event.title}
                </Typography>
                <Typography covariant="body2" style={{color: event.invite_only ? "red" : "green"}} component="p">
                    {event.invite_only ? "Ḱräver inbjudan" : "Öppen"}
                </Typography>
                <Typography covariant="body2" style={{color: "gray"}} component="p">
                    {event.date ? date  + " " + time : null}
                </Typography>
            </CardContent>
            <CardActions>
                { ((!event.invite_only && event.is_public) || event.admin_id) ?  
                <Button className="no-outline" size="small" color="primary" onClick={() => select(event)}>
                Välj
                </Button> : null}
                { event.invite_only && event.is_public ? 
                <Button className="no-outline" size="small" color="primary" onClick={() => request(event)}>
                    Skicka förfrågan
                </Button> : null }
            </CardActions>
        </Card>
      </div>
  );
}

export default EventCard;