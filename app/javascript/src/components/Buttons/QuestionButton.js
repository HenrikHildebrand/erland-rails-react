import React from 'react'
import ListIcon from '@material-ui/icons/List';
import Fab from '@material-ui/core/Fab/index';
import styles from './styles'

const questionButton = (props) => {
    const classes = styles();
    return(
        <Fab 
            className={classes.fabList}
            variant="extended" 
            aria-label="like"  
            onClick={props.click}>
            <ListIcon className={classes.extendedIcon} />
            Frågor
        </Fab>
    )
}

export default questionButton