import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    card: {
        width: '90%',
        maxWidth: 350,
        margin: "10px auto 10px auto",
        backgroundColor: '#555',
        border: '1px solid #666',
        borderRadius: 30,

      },
      media: {
        height: 100,
      },
      mediaSkeleton: {
        top: -25, 
        right: 0,
        left: 0,
        height: 120
      }
  }));

  export default useStyles;