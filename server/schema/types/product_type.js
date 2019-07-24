const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } = graphql;

const Product = mongoose.model("products");
const Category  = mongoose.model("categories");
const CategoryType = require("./category_type");

const ProductType = new GraphQLObjectType({
    name: "ProductType",
    // remember we wrap the fields in a thunk to avoid circular dependency issues
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        weight: { type: GraphQLInt },
        category: {
            type: CategoryType,
            resolve(parentValue){
                return Category.findById(parentValue.category)
                    .then(category => category)
                    .catch(err => console.log(err))
            }
        }
        
    })
});

module.exports = ProductType;

// abode: {
//   type: AbodeType,
//     resolve(parentValue) {
//     return Abode.findById(parentValue.abode)
//       .then(abode => abode)
//       .catch(err => console.log(err))
//   }
// }