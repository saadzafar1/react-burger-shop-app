import React from 'react'
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
const sideDrawer = (props)=>{
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.show){
        attachedClasses=[classes.SideDrawer, classes.Open]
    }   
    return(
        <div>
            <Backdrop show={props.show} clicked={props.closed} />
            <div className={attachedClasses.join(" ")}>
                <div className={classes.SideDrawerLogo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </div>
    )
}

export default sideDrawer