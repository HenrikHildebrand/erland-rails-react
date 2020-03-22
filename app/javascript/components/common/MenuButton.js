import React from 'react'
import Fab from '@material-ui/core/Fab';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Zoom from '@material-ui/core/Zoom';

const styles = {
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        outline: 'none'
        // backgroundColor: "#06f"
    },
    icon: {
        outline: 'none'
    }

}

export default (props) => (
    <Zoom in={props.loaded} style={{ transitionDelay: props.loaded ? '500ms' : '0ms' }}>
        <Fab color="primary" aria-label="add" style={styles.fab} onClick={props.click}>
            <MenuRoundedIcon style={styles.icon} />
        </Fab>
    </Zoom>
)
