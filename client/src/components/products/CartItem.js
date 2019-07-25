import React from 'react'
import Queries from "../../graphql/queries";
import { Query } from 'react-apollo';
const { FETCH_PRODUCT } = Queries;

class CartItem extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      quantity: 1,
    }
  }

  render(){
    return (
      <Query query={FETCH_PRODUCT} variables={{ id: this.props._id }}>
        {({ loading, error, data }) => {
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
              }}>
                +
              </button>
              <button onClick={() => {
                if (this.state.quantity > 1){
                  this.setState({ quantity: this.state.quantity - 1 })
                }
              }}>
                -
              </button>
            </li>
          )
        }}
      </Query>
    )
  }
}

export default CartItem;