import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import EventForm from './EventForm'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    margin: {
      margin: 10
    },
  });

  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        <IconButton aria-label="close" className={classes.closeButton + " no-outline"} onClick={() => onClose(false)}>
           <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
    );
  });

const CreateEventDialog = (props) => {
  const [open, setOpen] = [props.open, props.setOpen]


  const handleClose = (event) => {
    setOpen(false, event);
  };

  return (
        <Dialog
            style={{margin:"5%"}}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen
        >

            <DialogTitle id="alert-dialog-title" onClose={handleClose}>
                Skapa Event
            </DialogTitle>
            <DialogContent>
                <EventForm token={props.token} close={handleClose}/>
            </DialogContent>
        </Dialog>
  );
}

export default CreateEventDialog;
