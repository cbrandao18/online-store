const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const models = require("./models");
const app = express();
const schema = require("./schema/schema");
const expressGraphQL = require("express-graphql");
const cors = require("cors");

if (!db) {
    throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());
app.use(cors());
app.use(
    "/graphql",
    expressGraphQL({
        schema,
        graphiql: true
    })
);

module.exports = app;