import React from 'react'
import Queries from "../../graphql/queries";
import { Query } from 'react-apollo';
const { FETCH_PRODUCT } = Queries;

class CartItem extends React.Component {

  render(){
    return (
      <Query query={FETCH_PRODUCT} variables={{ id: this.props._id }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! s${error.message}`;
          let product = data.product;
          
          return (
            <li>
              <p>{product.name} / ${product.cost}.00</p>
            </li>
          )
        }}
      </Query>
    )
  }
}

export default CartItem;