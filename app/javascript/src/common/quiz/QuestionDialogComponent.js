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
  // const classes = useStyles();
  const { onClose, open, question, handleAnswer, answers} = props;

  const handleClose = (save) => {
    onClose(save);
  };

  const setSelected = (event, q_id, alt_id) => {
    handleAnswer(event, q_id, alt_id);
  }

  return(
      <Dialog onClose={() => handleClose(false)}   open={open}>
        <DialogTitle id="customized-dialog-title" style={{marginRight:40}}  onClose={() => handleClose(false)}>
          {question.pin ? question.pin.title : null}
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {question.pin ? 
            question.pin.alternatives.map((alt, index) => {
              return(
                <ListItem key={alt + index} button selected={question.pin.answer === alt.id} onClick={(event) => setSelected(event, (question ? question.index : null), alt.id)}>            
                  <ListItemText primary={alt.title} />
                </ListItem>
              );
            }): null}

          </List>
        </DialogContent>
        {question && answers && question.showAnswers ? 
          <DialogContent dividers>
            <Typography gutterBottom>
              {answers.map((a, i) => 
                (
                  <p key={i}>{a.user}: {a.text}</p>
                )
              )}
              
            </Typography>
          </DialogContent>
        : null}
        <DialogActions>
          <Button autoFocus className="no-outline" onClick={() => handleClose(true)} color="primary">
            Skicka
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default QuestionDialog;
