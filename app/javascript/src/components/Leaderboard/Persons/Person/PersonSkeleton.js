

import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles'
import Skeleton from '@material-ui/lab/Skeleton';


const personSkeleton = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ExpansionPanel classes={{root: classes.expansionRoot}}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
              <Skeleton animation="wave" variant="circle" width={50} height={50} />
          </div>
          <div className={classes.column}>
              <Skeleton animation="wave" height={20} width="100%" style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={20} width="80%" style={{ marginBottom: 6 }} />
          </div>
        </ExpansionPanelSummary>      
      </ExpansionPanel>
    </div>
  );
}

export default personSkeleton;