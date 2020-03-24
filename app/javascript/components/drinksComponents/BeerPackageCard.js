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
    height: 30,
  },
});

const BeerpackageCard = (props) => {
  const classes = useStyles();
  const redShadow = "0 1px 2px #f00";
  const greenShadow = "0 1px 2px #23B24E";
  const date = props.time.split('T')[0]
  const time = props.time.split('T')[1].split('.')[0]
  return (
    <div className="do-transition">
      <Card style={{boxShadow: (props.confirmed ? greenShadow : redShadow )}} className={classes.card}>
          <CardMedia
            className={classes.media}
            image={props.confirmed ? "/static/green_img.jpg" : "/static/red_img.png"}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.receiver ? "Från "  + props.name : "Till " + props.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Skickades {date} {time}
            </Typography>
          </CardContent>
        <CardActions>
          { props.receiver && !props.confirmed ? <Button className="no-outline" size="small" color="primary" onClick={() => props.handleAccept(props.id, props.index)}>
            Godkänn
          </Button> : null }
        </CardActions>
      </Card>
    </div>
  );
}

export default BeerpackageCard;