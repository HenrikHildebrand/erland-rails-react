import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: "auto"
    },
    linkStyle: {
        color: 'black !important',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    img: {
        width: 100,
        height: 100
    },
    rounded: {
        borderRadius: "0 30px 30px 0",
        backgroundColor: 'rgba(50, 50, 50, 0.95)', 
        color: '#eee'
    }
}))

export default useStyles;
