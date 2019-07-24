const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

const UserType = require("./user_type");
const CategoryType = require("./category_type");
const ProductType = require("./product_type");

const User = mongoose.model("users");
const Category = mongoose.model("categories");
const Product = mongoose.model("products");

const axios = require('axios');
const secrets = require('../../../config/keys');

const authOptions = {
  method: "GET",
  url:
    "https://vyfykjyxki.execute-api.us-east-2.amazonaws.com/default/generate-price",
  headers: {
    "x-api-key": secrets.AWSKey
  }
};

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: () => ({
        users: {
          type: new GraphQLList(UserType),
          resolve() {
              return User.find({});
          }
        },
        user: {
          type: UserType,
          args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
          resolve(_, args) {
              return User.findById(args._id);
          }
        },
        categories: {
          type: new GraphQLList(CategoryType),
          resolve(){
              return Category.find({});
          }
        }, 
        category: {
          type: CategoryType,
          args: { _id: { type: new GraphQLNonNull(GraphQLID)} },
          resolve(_, args){
              return Category.findById(args._id)
          }
        },
        products: {
          type: new GraphQLList(ProductType),
          resolve() {
            return Product.find({}).then(products => {
              let productsWithCosts = products.map(product => {
                return axios(authOptions).then(res => {
                  // set our cost onto the Product Object
                  product.cost = res.data.cost;
                  // then return the complete product object
                  return product;
                });
              })
              return productsWithCosts;
            })
          }
        },
        product: {
          type: ProductType,
          args: { _id: { type: GraphQLID } },
          resolve(_, args) {
            // find our product
            return Product.findById(args._id).then(product => {
              // then fetch our price using the above options
              return axios(authOptions).then(res => {
                // set our cost onto the Product Object
                product.cost = res.data.cost;
                // then return the complete product object
                return product;
              });
            });
          }
        }
    })
});

module.exports = RootQueryType;