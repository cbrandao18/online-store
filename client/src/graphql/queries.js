import gql from "graphql-tag";

export default {
  FETCH_PRODUCTS: gql`
    {
      products {
        _id
        name
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
}