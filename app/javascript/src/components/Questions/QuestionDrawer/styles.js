import React from 'react';
import { makeStyles } from '@material-ui/core/styles/index';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    container: {overflowY: "scroll", maxHeight: 400},
    rounded: {
        borderRadius: "30px 30px 0 0",
    }

});

export default useStyles;