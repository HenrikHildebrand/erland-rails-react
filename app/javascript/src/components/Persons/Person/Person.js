import React from 'react';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel/index';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/index';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/index';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions/index';
import Typography from '@material-ui/core/Typography/index';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip/index';
import Button from '@material-ui/core/Button/index';
import Divider from '@material-ui/core/Divider/index';
import useStyles from './styles'
import Swal from 'sweetalert2'


const normalType = "?type=large";

const person = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false)

  const sendBeer = () => {
    Swal.fire({
      title: 'Din dryck skickades!',
      text: 'Se till att den jäveln tar den också...',
      icon: 'success',
      showConfirmButton: false,
      timer: 3000,
    })
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel classes={{root: classes.expansionRoot}} expanded={open}>
        <ExpansionPanelSummary 
          onClick={()=>setOpen(!open)}
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1c-content" 
          id="panel1c-header"
        >
          <div className={classes.column}>
              <img style={open ? {transform: 'scale(1.5)'} : null } className={classes.img} src={ props.person.attributes.image ? props.person.attributes.image+normalType : "http://graph.facebook.com/v2.10/10156873242627252/picture"+normalType} />
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>{props.person.attributes.name ? props.person.attributes.name : props.person.attributes.email }</Typography>
          </div>
        </ExpansionPanelSummary>
        
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column}>
            <Chip label="Öl från Henke" onDelete={() => {}} />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography style={{color: "#eee"}} variant="caption">
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
          <Button className={classes.btnCancel} size="small" onClick={()=>setOpen(false)}>Stäng</Button>
          <Button className={classes.btn} size="small" color="primary" variant="contained" onClick={sendBeer}>
            Ge dryck
          </Button>
        </ExpansionPanelActions>
      
      </ExpansionPanel>
    </div>
  );
}

export default person;