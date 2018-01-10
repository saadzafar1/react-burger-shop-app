import React, { Component } from 'react'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer:false
    }
    
    sideDrawerCloseHandler = ()=>{
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
    return (
        <div>
            <Toolbar opened={this.sideDrawerToggleHandler} />
            <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} />
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </div>
    )
  }
}

export default Layout