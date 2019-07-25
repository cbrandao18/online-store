import gql from "graphql-tag";

export default {
  FETCH_PRODUCTS: gql`
    {
      products {
        _id
        name
        description
      }
    }
  `,
  FETCH_PRODUCT: gql`
    query FetchProduct($id: ID!) {
      product(_id: $id) {
        _id,
        name,
        description,
        weight,
        cost
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_CART_ITEMS: gql`
    query FetchCartItems {
      cart @client {
        cost
        quantity
        _id
      }
    }
  `
}