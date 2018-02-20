import React, { Component } from "react";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls:{
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email Address'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value: '',
                validation:{
                    required:true,
                    minlength: 6
                },
                valid:false,
                touched:false
            }
        },
        isSignup:true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
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

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }

    switchAuthHandler = () =>{
        this.setState(prevState=>{
            return {isSignup: !prevState.isSignup};
        });
    }

    render() {
        const formElements = [];
        for (let key in this.state.controls){
            formElements.push({
                id:key,
                config: this.state.controls[key]
            })
        }
        let form = formElements.map(formElement=>(
            <Input 
                key={formElement.id}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                changed={(event)=>this.inputChangeHandler(event,formElement.id)} 
            />
        ));

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
        <div className={classes.Auth}>
            {authRedirect}
            <h1>{this.state.isSignup ? 'Sign Up':'Sign In'} Account</h1>
            {errorMessage}
            <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>               
            </form>
            <Button
            clicked={this.switchAuthHandler} 
            btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN':'SIGNUP'}</Button>
        </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password, isSignup)=>dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);