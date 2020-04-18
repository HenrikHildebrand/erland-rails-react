import React from 'react'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab/index';
import styles from './styles'


const navButton = (props) => {
    const classes = styles();   
    return(
        <Fab 
            className={classes.fab}
            variant="round" 
            onClick={props.click}>
            <NavigationIcon />
        </Fab>
    )
} 


export default navButton;
// className="no-outline" variant="extended" aria-label="like" style={buttonStyles.fab} onClick={this.onCurrentPositionClick}>