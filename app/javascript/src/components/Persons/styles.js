import React from 'react'
import { makeStyles } from '@material-ui/core/styles/index';

const useStyles = makeStyles((theme) => ({
    maxHeightTransition: {
        transition: 'max-height 0.3s ease-in-out;',
        overflowY: 'hidden'
    }
  }));

  export default useStyles;