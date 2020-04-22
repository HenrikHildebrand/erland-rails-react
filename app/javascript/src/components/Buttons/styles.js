
import React from 'react';
import { makeStyles } from '@material-ui/core/styles/index';

import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
      fabList: {
          position: "absolute",
          bottom: "20px",
          left: "20px",
          zIndex: "996",
          outline: "none !important",
          // backgroundColor: "#007bff",
        },
      extendedIcon: {
        marginRight: "0px",
        outline: "none !important"
      },
      root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        position: 'relative',
        minHeight: 200,
      },
      fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        left: theme.spacing(18),
        outline: "none !important",
      },
      fabDarkMode: {
        position: 'absolute',
        bottom: theme.spacing(2),
        left: theme.spacing(26),
        outline: "none !important",
        backgroundColor: '#fff'
      },
      fabLightMode: {
        position: 'absolute',
        bottom: theme.spacing(2),
        left: theme.spacing(26),
        outline: "none !important",
        backgroundColor: '#222'
      },
      fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[600],
        },
      }
    }));

export default useStyles;
