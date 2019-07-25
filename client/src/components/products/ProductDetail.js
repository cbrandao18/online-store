import React from 'react';
import { Query } from "react-apollo";
import Queries from '../../graphql/queries';
import AddToCart from './AddToCart';
const { FETCH_PRODUCT } = Queries;

const ProductDetail = (props) => {
  return (
    <Query query={FETCH_PRODUCT} variables={{ id: props.match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <div>
            <p>{data.product.name}</p>
            <p>{data.product.description}</p>
            <p>{data.product.weight}</p>
            <AddToCart _id={data.product._id} cost={data.product.cost} quantity={1}/>
          </div>
        );
      }}
    </Query>
  )
}

export default ProductDetail;