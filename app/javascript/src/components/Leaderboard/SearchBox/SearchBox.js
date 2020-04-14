import React from 'react'
import useStyles from './styles'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const searchBox = (props) => {
    const classes = useStyles();
   
    return( 
        <div className={classes.search}>
            <InputBase
              placeholder="Sök ölsugna människor..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => props.change(event.target.value)}
              color="primary"
            />
          </div>
    
    );
}

export default searchBox;
