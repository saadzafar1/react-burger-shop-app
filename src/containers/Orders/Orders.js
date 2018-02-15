import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json').then(response=>{
            const fetchedOrders=[];
            for(let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id:key
                });
            }
            this.setState((prevState,props)=>{
                return {loading:false,orders:fetchedOrders};
            });
        }).catch(e=>{
            this.setState((prevState,props)=>{
               return {loading:false};
            });
            console.log(e);
        });
    }
    render(){
        return(
            <div>
               {this.state.orders.map(order=>{
                   return <Order ingredients={order.ingredients} price={order.price} key={order.id}/>;
               })}                
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);