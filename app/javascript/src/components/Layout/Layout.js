import React from 'react'
import Header from './Header/Header'
import Aux from '../../hoc/Aux'
import MenuButton from './MenuButton/MenuButton'
import Drawer from './Drawer/Drawer'


import classes from './Layout.module.css'
import { Menu } from '@material-ui/core'

const layout = (props) => {

    const [open, setOpen] = React.useState(false)

    return(
        <Aux>
            <div className={classes.Header}>
                <Header />
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
            <div className={classes.MenuButton}>
                <MenuButton loaded={true} open={open} setOpen={setOpen} />
            </div>
            <Drawer open={open} setOpen={setOpen} />
        </Aux>
    )
}

export default layout;