import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component{
    checkoutCancelHandler = ()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');        
    }


    render(){
        const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
        return (
            <div>
                {purchaseRedirect}
                <CheckoutSummary
                checkoutCancelled={this.checkoutCancelHandler} 
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.props.ings}/> 
                <Route path={this.props.match.path+"/contact-data"} 
                 component={ContactData}/>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);