import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
      position: 'relative',
      minHeight: 200,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      left: theme.spacing(20),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }));

export default function FloatingActionButtonZoom(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = index => {
      setValue(index);
      props.toggle(index)
    };
  
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
  
    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
        label: 'Add',
      },
      {
        color: 'secondary',
        className: classes.fab,
        icon: <EditIcon />,
        label: 'Edit',
      },
      {
        color: 'inherit',
        className: clsx(classes.fab, classes.fabGreen),
        icon: <UpIcon />,
        label: 'Expand',
      },
    ];
  
    return (
      <div>
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab aria-label={fab.label} className={fab.className} color={fab.color} onClick={() => handleChangeIndex((index+1)%2)} >
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
      </div>
    );
  }