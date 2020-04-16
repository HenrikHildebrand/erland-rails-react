import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  cardRoot: {
    margin: "40px 10px 5px 10px",
    overflow: 'visible !important',
    overflowY: 'visible !important',
    overflowX: 'hidden',
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
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatarContainer: {
    width: 80,
    margin: 'auto',
  },
  avatar: {
    top: -30,
    boxShadow: '0 2px 15px #aaa'
  }
}));


export default useStyles;