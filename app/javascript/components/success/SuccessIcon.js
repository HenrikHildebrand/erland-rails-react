import React from 'react'
import './swal/main.scss'
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';

/*
*
* USAGE:
* this.setState({loaded: true, showSuccess: true})
* setTimeout(() => this.setState({showSuccess: false}), 1500)
*
* <SuccessIcon in={this.state.showSuccess} />
*/

export default (props) => (
    <Zoom in={props.in} mountOnEnter unmountOnExit >
        <div className="swal2-icon swal2-success swal2-icon-show" style={{position: 'absolute', top: 30, bottom: 0, left: 0, right:0, zIndex:1000, backgroundColor: "rgb(165, 220, 134)"}}>
            <div className="swal2-success-circular-line-left" />
            <span className="swal2-success-line-tip"  style={{backgroundColor:"#393"}}/>
            <span className="swal2-success-line-long" style={{backgroundColor:"#393"}} />
            <div className="swal2-success-ring" />
            <div className="swal2-success-fix" />
            <div className="swal2-success-circular-line-right" />
        </div>
    </Zoom>
)