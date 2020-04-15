import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import useStyles from './styles'
import { parseISOWithOptions } from 'date-fns/fp';
 

const swiper = (props) => {
    const styles = useStyles();
    return (
        <div className={styles.slide}>
            <SwipeableViews 
                index={props.index} 
                onChangeIndex={props.swipe} 
                className={styles.contentDiv} 
                containerStyle={{minHeight: "100%"}} 
                animateHeight animateTransitions resistance 
            >   
                {props.children}
            </SwipeableViews>
        </div>  
    );
}

export default swiper;