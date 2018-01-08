import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
  { label: 'Salad' , type:'salad' },
  { label: 'Bacon' , type:'bacon' },
  { label: 'Cheese' , type:'cheese' },
  { label: 'Meat' , type:'meat' }
];

const buildControls = (props) =>{
  return  <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
            {controls.map((control)=>{
             return <BuildControl
             added={()=>props.ingredientAdded(control.type)}
             removed={()=>props.ingredientRemoved(control.type)}
             disabled={props.disabled[control.type]} 
             key={control.label} label={control.label} />
            })}
          </div>
}
export default buildControls