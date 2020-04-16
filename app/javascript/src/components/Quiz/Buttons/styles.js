
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    fab: {
        position: "absolute",
        bottom: "80px",
        left: "20px",
        zIndex: "996",
        outline: "none !important",
      //   backgroundColor: "#007bff",
      },
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
});

export default useStyles;