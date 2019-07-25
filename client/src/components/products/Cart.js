import React from 'react'
import Queries from "../../graphql/queries";
import { Query, ApolloConsumer } from 'react-apollo';
import CartItem from './CartItem';
const { FETCH_CART_ITEMS } = Queries;

class Cart extends React.Component {

  render() {
    return (
      <Query query={FETCH_CART_ITEMS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          let cartItems = "no items";
          let totalCost = 0;
          if (data.cart){
            cartItems = data.cart.map(item => {
              totalCost += item.cost;
              return (<CartItem _id={item._id} key={item._id}/>)
            });
          }
          return (
            <div>
              <h2>
                Cart
              </h2>
              <ul>
                {cartItems}
              </ul>
              <p>Total cost: ${totalCost}</p>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Cart;