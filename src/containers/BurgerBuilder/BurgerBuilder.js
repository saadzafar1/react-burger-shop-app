import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';
import {connect} from 'react-redux';

class BurgerBuilder extends Component{
    state={
        purchasing:false,
        loading: false,
        error:false
    }

updatePurchase = (ingrds)=>{
    const ingredients = ingrds
    const sum = Object.keys(ingredients).map((igKey)=>{
        return ingredients[igKey]
    }).reduce((sum,el)=>{
        return sum+el
        },0);
       return sum > 0; 
}

purchaseHandler =()=>{
    this.setState({purchasing:true})
}

purchaseCancelHandler = ()=>{
    this.setState({purchasing:false})    
}

purchaseContinueHandler = ()=>{
    this.props.history.push('/checkout');
}
    render(){
        const disableInfo = {
            ...this.props.ings
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0
        }
        let orderSummary = <OrderSummary continue={this.purchaseContinueHandler} 
        cancelled={this.purchaseCancelHandler} 
        ingredients={this.props.ings}
        price={this.props.totalPrice} />
        
        if(this.state.loading){
            orderSummary =  <Spinner />
        }
        return (
            <div>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <div>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo} 
                    price={this.props.totalPrice}
                    purchasable={this.updatePurchase(this.props.ings)}
                    ordered={this.purchaseHandler}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))