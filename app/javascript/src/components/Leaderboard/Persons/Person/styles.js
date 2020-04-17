import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      marginBottom: 5
    },
    expansionRoot: {
      backgroundColor: '#555',
      margin: '0 5px 0 5px ',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: '#eee',
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: "#9999ff",
      fontStyle: 'bold',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    btn: {
        outline: 'none !important'
    },
    btnCancel: {
      outline: 'none !important',
      color: '#eee'
    },
    img: {
        height: 50,
        borderRadius: 25,
        transition: 'transform 0.25s ease-out',
        boxShadow: '0 0 5px #000'
    },
    skeleton: {
      backgroundColor: '#fafafa'
    }
  }));

  export default useStyles;