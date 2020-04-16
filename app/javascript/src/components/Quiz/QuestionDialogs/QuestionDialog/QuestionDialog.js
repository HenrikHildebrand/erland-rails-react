import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const QuestionDialog = (props) => {
    const [selected, setSelected] = React.useState(null)


  const { onClose, open, question} = props;
  const handleClose = (save) => {
    onClose(save, selected);
  };

  return(
      <Dialog onClose={() => handleClose(false)}   open={open}>
        <DialogTitle id="customized-dialog-title" style={{marginRight:40}}  onClose={() => handleClose(false)}>
          {question.title}
        </DialogTitle>
        <DialogContent dividers>
          <List>
            { 
                question.alternatives.map((alt, index) => (
                    <ListItem key={alt + index} button selected={selected === index} onClick={() => setSelected(index)} >            
                        <ListItemText primary={alt} />
                    </ListItem>
                ))
            }

          </List>
        </DialogContent>
        <DialogActions>
          <Button autoFocus className="no-outline" onClick={() => handleClose(true)} color="primary">
            Skicka
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default QuestionDialog;
