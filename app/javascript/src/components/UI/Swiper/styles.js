import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    slide: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowY: 'auto'
    },
    contentDiv: { 
        position: 'absolute', 
        top: 43, 
        bottom: 0, 
        left: 0, 
        right: 0, 
        minHeight: 300,
        overflowY: 'auto'
    },
    scroller: {
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden'
    }
}))

export default useStyles;