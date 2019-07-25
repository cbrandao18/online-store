import React from 'react'
import Queries from "../../graphql/queries";
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
const { FETCH_PRODUCT, FETCH_CART_ITEMS } = Queries;

class CartItem extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      quantity: this.props.quantity,
    }
  }

  render(){
    return (
      <ApolloConsumer>
        {client => (
          <Query query={FETCH_PRODUCT} variables={{ id: this.props._id }}>
            {({ loading, error, data, refetch}) => {
              if (loading) return "Loading...";
              if (error) return `Error! s${error.message}`;
              let product = data.product;

              let productItem;
              if (this.state.quantity === 1){
                productItem = (<p>{product.name} / ${product.cost}.00</p>)
              } else {
                let cost = product.cost * this.state.quantity;
                productItem = (<p>{this.state.quantity} {product.name}s / ${cost}.00</p>)
              }
              
              return (
                <li>
                  {productItem}
                  <button onClick={() => {
                    this.setState({quantity: this.state.quantity+1})
                    let currentCart = client.readQuery({query: FETCH_CART_ITEMS})
                    currentCart = currentCart.cart;
                    let newCart = [];
                    currentCart.forEach(item => {
                      if (item._id === this.props._id) {
                        newCart.push({ _id: item._id, quantity: item.quantity + 1, cost: item.cost, __typename: "cart item" })
                      } else {
                        newCart.push(item);
                      }
                    })
                    client.writeQuery({
                      query: FETCH_CART_ITEMS,
                      data: { cart: newCart }
                    })
                  }}>
                    +
                  </button>

                  <button onClick={() => {
                    if (this.state.quantity > 1){
                      this.setState({ quantity: this.state.quantity - 1 })
                      let currentCart = client.readQuery({query: FETCH_CART_ITEMS})
                      currentCart = currentCart.cart;
                      let newCart = [];
                      currentCart.forEach(item => {
                        if (item._id === this.props._id) {
                          newCart.push({_id: item._id, quantity: item.quantity-1, cost: item.cost, __typename: "cart item"})
                        } else {
                          newCart.push(item);
                        }
                      })
                      client.writeQuery({
                        query: FETCH_CART_ITEMS,
                        data: { cart: newCart }
                      })
                    }
                  }}>
                    -
                  </button>
                </li>
              )
            }}
          </Query>
        )}
      </ApolloConsumer>
    )
  }
}

export default CartItem;