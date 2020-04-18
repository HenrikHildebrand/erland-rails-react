import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    Header: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        background: 'rgba(75, 75, 75, 0.95)',
        boxShadow: '0 1px 2px #000',
    }
}))

export default useStyles;
