import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const ingredientPrices = {
        salad: 0.5,
        cheese : 0.4,
        meat: 1.3,
        bacon: 0.7   
}
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:0,
        purchasable:false,
        purchasing:false
    }

updatePurchase = (ingrds)=>{
    const ingredients = ingrds
    const sum = Object.keys(ingredients).map((igKey)=>{
        return ingredients[igKey]
    }).reduce((sum,el)=>{
        return sum+el
        },0)
       this.setState({ purchasable: sum > 0 }) 
}

addIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updateIngredients = {...this.state.ingredients};

    updateIngredients[type] = updatedCount
    const priceAddition = ingredientPrices[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition 
    this.setState({
        totalPrice:newPrice,
        ingredients:updateIngredients
    })
    this.updatePurchase(updateIngredients)
}
removeIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type];
    if(oldCount <=0){
        return
    }
    const updatedCount = oldCount - 1;
    const updateIngredients = {...this.state.ingredients};

    updateIngredients[type] = updatedCount
    const priceDeduction = ingredientPrices[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction 
    this.setState({
        totalPrice:newPrice,
        ingredients:updateIngredients
    })
    this.updatePurchase(updateIngredients)
}

purchaseHandler =()=>{
    this.setState({purchasing:true})
}

purchaseCancelHandler = ()=>{
    this.setState({purchasing:false})    
}

    render(){
        const disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0
        }
        return (
            <div>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <div>
                    <BuildControls ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo} 
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
                </div>
            </div>
        )
    }
}
export default BurgerBuilder