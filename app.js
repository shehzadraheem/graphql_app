const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./server/schema/schema');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))



mongoose.connect( `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@graphqlcluster.fpcxm.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Hello');
    app.listen(PORT, () => {
      //console.log(process.env.mongoUserName);
      //localhost:4000
      console.log("Listening for requests on my awesome port " + port);
    });
  }).catch((e) => {
    //console.log(process.env.mongoUserName);
     console.log("Error Found:::" + e);
  });