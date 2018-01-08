import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
        totalPrice:0
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
                <Burger ingredients={this.state.ingredients} />
                <div>
                    <BuildControls ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo} 
                    price={this.state.totalPrice}/>
                </div>
            </div>
        )
    }
}
export default BurgerBuilder