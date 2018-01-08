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
            salad:1,
            bacon:1,
            cheese:1,
            meat:1
        },
        totalPrice:4
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
removeIngredientHandler = ()=>{

}

    render(){
        return (
            <div>
                <Burger ingredients={this.state.ingredients} />
                <div>
                    <BuildControls ingredientAdded={this.addIngredientHandler} />
                </div>
            </div>
        )
    }
}
export default BurgerBuilder