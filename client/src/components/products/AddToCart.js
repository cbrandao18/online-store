import React from 'react'
import Queries from "../../graphql/queries";
import { Query, ApolloConsumer } from 'react-apollo';
const { FETCH_CART_ITEMS } = Queries;

class AddToCart extends React.Component {

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={FETCH_CART_ITEMS}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;
              let cart = data.cart;
              let productInCart = false;

                for(let i=0; i< cart.length; i++){
                  if (cart[i]._id === this.props._id){
                    productInCart = true;
                  }
                }

              let button;
              if (productInCart) {
                button = (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      let newCart = [];
                      cart.filter(item => {
                        return item._id !== this.props._id;
                      })
                      client.writeData({data: {cart: newCart }})
                    }}
                  >
                    Remove from cart
                </button>)
              } else {
                button = (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      cart.push({ _id: this.props._id, cost: this.props.cost, __typename: "Name" })
                      client.writeData({ data: { cart: cart } })
                    }}
                  >
                    Add to cart
                </button>)
              }

              return (
                <div>
                  {button}
                </div>
              );
            }}
          </Query>
        )}
      </ApolloConsumer>
    )
  }
}

export default AddToCart;