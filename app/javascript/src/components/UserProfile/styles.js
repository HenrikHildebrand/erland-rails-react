import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  cardRoot: {
    margin: "60px 10px 50px 10px",
    overflow: 'visible !important',
    overflowY: 'visible !important',
    overflowX: 'hidden',
    borderRadius: 20
  },
  root: {
    minWidth: 275,
    boxShadow: '0 2px 5px #ccc'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  avatarContainer: {
    width: 160,
    height: 100,
    margin: 'auto',
  },
  avatar: {
    top: -50,
    boxShadow: '0 2px 15px #aaa'
  },
  button: {
    margin: 'auto',
    width: '80%', 
    bottom: -26,
    boxShadow: '0 2px 3px #333'
  }
}));


export default useStyles;