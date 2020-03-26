import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

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
      margin: 20
    },
  });

  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        <IconButton aria-label="close" className={classes.closeButton + " no-outline"} onClick={onClose}>
           <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
    );
  });

const AddQuestionDialog = (props) => {
  const [open, setOpen] = [props.open, props.setOpen]


  const handleClose = (event) => {
    setOpen(false);
  };

  return (
        <Dialog
            style={{margin:5}}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen
        >
            <DialogTitle id="alert-dialog-title" onClose={handleClose}>
              lägg till fråga
            </DialogTitle>
            <DialogContent>
              <form>
              <div className="row">
                    <TextField required id="lat" name="lat" label="Lat" variant="outlined" disabled  value={props.marker.position ? props.marker.position.lat:null} fullWidth/>
              </div>
              <div className="row">
                    <TextField required id="lng" name="lng" label="Lng" variant="outlined"  disabled value={props.marker.position ? props.marker.position.lng:null} fullWidth/>
              </div>

                <div className="row">
                    <TextField required id="name" name="name" label="Fråga" variant="outlined" fullWidth autoFocus />
                </div>
                <div className="row">
                  <div className="row">
                  
                  </div>
                  <div className="row">
                  
                  </div>
                  <div className="row">
                    
                  </div>
                </div>
              </form>
            </DialogContent>
        </Dialog>
  );
}

export default AddQuestionDialog;