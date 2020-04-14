import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    Content: {
        margin: '16px auto',
        maxWidth: 600,
    },
    Header: {
        height: 42
    },
    MenuButton: {
        position: "absolute",
        right: 36,
        bottom: 36,
    }
}))

export default useStyles;