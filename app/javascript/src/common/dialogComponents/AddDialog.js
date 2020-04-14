import React, {Suspense} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton + " no-outline"} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const AddDialog = (props) => {
  const { onClose, selectedValue, open, user } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const closeClicked = () => {
    onClose();
  }

  const handleListItemClick = value => {
    onClose(value);
  };


  return(
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
      <DialogTitle id="customized-dialog-title" onClose={() => closeClicked()}>Bekräfta mottagare</DialogTitle>
      <Divider />
        <div style={{minWidth: 300 ,padding: 10}}>
            <h4>{user ? user.person.user.name : null}</h4>
            <p>Dryck: 1st</p>
          </div>
      <Divider />
      <div style={{minWidth: 300 ,padding: 10}}>
        {user ? <Button className="no-outline" fullWidth size="medium" variant="contained" color="primary" onClick={() => handleListItemClick(user.index)}>
          Godkänn
        </Button> : null}
      </div>    
    </Dialog>
  );
}

AddDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AddDialog;
