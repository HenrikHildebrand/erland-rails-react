import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    Header: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 1px 2px #999',
    }
}))

export default useStyles;
