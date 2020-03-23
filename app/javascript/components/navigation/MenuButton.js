import React from 'react'
import Fab from '@material-ui/core/Fab/index';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Zoom from '@material-ui/core/Zoom/index';

const styles = {
    fab: {
        position: 'absolute',
        right: 40,
        bottom: 40,
        outline: 'none'
    },
    icon: {
        outline: 'none'
    }

}

export default (props) => (
    <Zoom in={props.loaded} style={{ transitionDelay: props.loaded ? '500ms' : '0ms' }}>
        <Fab color="primary" aria-label="add" style={styles.fab} onClick={(event) => props.click(event, !props.open)}>
            <MenuRoundedIcon style={styles.icon} />
        </Fab>
    </Zoom>
)
