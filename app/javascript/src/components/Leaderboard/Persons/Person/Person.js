import React from 'react';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles'


const person = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel >

        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
              <img className={classes.img} src="http://graph.facebook.com/v2.10/10156873242627252/picture" />
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{props.person}</Typography>
          </div>
        </ExpansionPanelSummary>
        
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="Öl från Henke" onDelete={() => {}} />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Motto för användare
              <br />
              <a href="#secondary-heading-and-columns" className={classes.link}>
                Visa chatt
              </a>
            </Typography>
          </div>
        </ExpansionPanelDetails>
        
        <Divider />
        
        <ExpansionPanelActions>
          <Button className={classes.btn} size="small">Stäng</Button>
          <Button className={classes.btn} size="small" color="primary" variant="contained">
            Ge dryck
          </Button>
        </ExpansionPanelActions>
      
      </ExpansionPanel>
    </div>
  );
}

export default person;