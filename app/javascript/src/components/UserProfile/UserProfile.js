import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import BeerDrawer from './BeerDrawer/BeerDrawer'
import Aux from '../../hoc/Aux'
import Zoom from '@material-ui/core/Zoom'
import Fade from '@material-ui/core/Fade'

import styles from './styles'

const largeType = "?type=large";

const userProfile = ({ user }) => {
  const [open, setOpen] = React.useState(false)
  const [show, setShow] = React.useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  const classes = styles();
  const bull = <span className={classes.bullet}>•</span>;

  return (

    <Aux>
      <Card className={classes.root} classes={{root: classes.cardRoot}} variant="outlined">
        <Zoom in={show} timeout={400} style={{transitionDelay: 600}} mountOnEnter>
          <div className={classes.avatarContainer}>
            <Avatar 
              src={ user && user.image ? user.image+largeType : "http://graph.facebook.com/v2.10/10156873242627252/picture" + largeType} 
              className={[classes.large, classes.avatar].join(' ')} 
              elevation={4} />
          </div>
        </Zoom>
        <Fade in={show} timeout={600} style={{transitionDelay: 600}} mountOnEnter>
          <div>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom align="center">
                {user.email}
              </Typography>
              <Typography style={{color: '#eee'}} variant="h5" component="h2" align="center">
                {user.name ? user.name : "<Namn saknas...>"}
              </Typography>
              <Typography className={classes.pos} color="textSecondary" align="center">
                Öl som väntar på dig: <strong>0 st</strong>
              </Typography>
              <Typography style={{color: '#eee'}} variant="body2" component="p" align="center">
                Credits: <strong>0$</strong>
              </Typography>
            </CardContent>
          </div>
        </Fade>
        <CardActions >
            <Zoom in={show} timeout={400} style={{transitionDelay: 600}} mountOnEnter>
                <Button className={classes.button} size="large" color="primary" variant="contained" onClick={() => setOpen(true)}>Mina drycker</Button>
            </Zoom>
        </CardActions>
      </Card>
      <BeerDrawer 
        open={open} 
        setOpen={setOpen} />
    </Aux>


  );
}


export default userProfile;