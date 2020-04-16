import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import styles from './styles'
import Skeleton from '@material-ui/lab/Skeleton';

const EventSkeleton = () => {
  const classes = styles();
  
  return (
      <div>
        <Card className={classes.card} elevation={3}>
        <CardMedia
            className={classes.media}
            title="erland"
            children={<Skeleton classes={{root: classes.mediaSkeleton}} animation="wave"/>}
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">            
                    <Skeleton animation="wave" width='80%' height={32} />
                </Typography>
                <Typography covariant="body2" component="p">            
                     <Skeleton animation="wave" width='30%' height={24} />
                </Typography>
                <Typography covariant="body2" style={{color: "gray"}} component="p">
                    <Skeleton animation="wave" variant="text" width='50%' height={24} />
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
      </div>
  );
}

export default EventSkeleton;