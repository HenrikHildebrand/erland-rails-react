import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    slide: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    contentDiv: { 
        position: 'absolute', 
        top: 48, 
        bottom: 0, 
        left: 0, 
        right: 0, 
        minHeight: 300
    }
}))

export default useStyles;