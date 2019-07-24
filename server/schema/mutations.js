const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");

const Category = mongoose.model("categories");
const Product = mongoose.model("products");
const CategoryType = require('./types/category_type');
const ProductType = require('./types/product_type');

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
      type: CategoryType,
      args: {
        name: {type: GraphQLString}
      },
      resolve(_, {name}) {
        return (new Category({name})).save();
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Category.remove({ _id: id });
      }
    },
    newProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        weight: { type: GraphQLInt },
      },
      resolve(_, {name, description, weight}){
        return (new Product({name, description, weight})).save();
      }
    },
    deleteProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Product.remove({ _id: id })
      }
    },
    updateProductCategory: {
      type: ProductType,
      args: {
        productId: { type: GraphQLID },
        categoryId: { type: GraphQLID }
      },
      resolve(_, { productId, categoryId}) {
        return Product.updateProductCategory(productId, categoryId);
      }
    }
  }
});

module.exports = mutation;


