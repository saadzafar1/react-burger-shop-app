import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

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
        purchasing:false,
        loading: false
    }
componentDidMount(){
    axios.get('https://burger-shop-30d02.firebaseio.com/ingredients.json')
    .then(response=>{
        
    })
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

purchaseContinueHandler = ()=>{
    this.setState({loading:true})
    const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
            name: 'Saad',
            address:{
                street: 'House#213-A, St#9',
                zipCode: '54000',
                country: 'Pakistan'
            },
            email: 'saadie.111@gmail.com'
        },
        deliveryMethod: 'fastest'
    }
    axios.post('/orders.json',order)
    .then(response => {
        this.setState({loading:false,purchasing:false})
        console.log(response)
    })
    .catch(error => {
        this.setState({loading:false,purchasing:false})
        console.log(error)
    })
}
    render(){
        const disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <=0
        }
        let orderSummary = <OrderSummary continue={this.purchaseContinueHandler} 
        cancelled={this.purchaseCancelHandler} 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice} />
        
        if(this.state.loading){
            orderSummary =  <Spinner />
        }
        return (
            <div>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
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
export default withErrorHandler(BurgerBuilder,axios)