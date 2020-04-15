import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '90%',
        maxWidth: 350,
        margin: "10px auto 10px auto"
      },
      media: {
        height: 100,
      },
  }));

  export default useStyles;