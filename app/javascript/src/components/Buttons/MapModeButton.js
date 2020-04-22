import React from 'react'
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab/index';
import styles from './styles'
import Zoom from '@material-ui/core/Zoom'
import Aux from '../../hoc/Aux'

const navButton = (props) => {
    const [value, setValue] = React.useState(0);
    const classes = styles();   
    const theme = useTheme();
    
    const handleChangeIndex = index => {
      setValue(index);
      props.toggle(index);
    };
  
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
  
    const fabs = [
      {
        color: 'primary',
        className: classes.fabDarkMode,
        icon: <Brightness5Icon />,
        label: 'Dark',
      },
      {
        color: 'secondary',
        className: classes.fabLightMode,
        icon: <Brightness2Icon style={{color: '#eee'}}/>,
        label: 'Light',
      },
    ];
  
    return (
        <Aux>
            {fabs.map((fab, index) => (
              <Zoom
                key={index}
                in={value === index}
                timeout={transitionDuration}
                style={{
                  transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
              >
                <Fab aria-label={fab.label} className={fab.className}  onClick={() => handleChangeIndex((index+1)%2)} >
                  {fab.icon}
                </Fab>
              </Zoom>
            ))}
        </Aux>
    );
} 


export default navButton;