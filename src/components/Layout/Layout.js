import React from 'react'
import classes from './Layout.css'
const layout = (props) =>{
    return (
        <div>
            <div>Toobar, Sidebar, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </div>
    )
}

export default layout