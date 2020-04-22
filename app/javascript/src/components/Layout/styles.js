import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    Content: {
        margin: 'auto',
        maxWidth: 600,
        url: 'static/erland.png'
    },
    Header: {
        height: 42
    },
    MenuButton: {
        position: "absolute",
        right: 18,
        bottom: 18,
    }
}))

export default useStyles;