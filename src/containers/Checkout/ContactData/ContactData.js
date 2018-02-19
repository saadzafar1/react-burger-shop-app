import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component{
    state = {
        orderForm:{
                name: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minlength:4
                    },
                    valid:false,
                    touched:false
                },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipCode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value: '',
                    validation:{
                        required:true,
                        minlength:5,
                        maxlength:5
                    },
                    valid:false,
                    touched:false
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email: {
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your E-mail'
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
            deliveryMethod: {
                elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'',displayValue:'Select Delivery Method'},
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    value: '',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
            }
        },
        formIsValid:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        const formData = {}
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData:formData      
        }
        this.props.onOrgerBurger(order);
    }

    checkValidity=(value,rules)=>{
        let isValid=true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minlength){
            isValid = value.length >=rules.minlength && isValid;
        }
        if(rules.maxlength){
            isValid = value.length <=rules.maxlength && isValid;
        }

        return isValid;
    }

    inputChangeHandler=(event,inputIdentifier)=>{
      const updatedOrderForm ={
          ...this.state.orderForm
      }
      const updatedFormElement =  {
          ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid});
    }

    render(){
        const formElements = [];
        for (let key in this.state.orderForm){
            formElements.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(el=>(
                    <Input 
                    key={el.id}
                    invalid={!el.config.valid}
                    touched={el.config.touched}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig} 
                    value={el.config.value}
                    changed={(event)=>this.inputChangeHandler(event,el.id)} /> 
                ))} 
                <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
               {form} 
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrgerBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))        
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));