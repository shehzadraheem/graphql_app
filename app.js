const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./server/schema/schema');
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;


app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

// app.listen(4000, ()=> {
//     console.log('Hello');
// });

mongoose.connect( `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@graphqlcluster.fpcxm.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen({ port: port }, () => {
      //console.log(process.env.mongoUserName);
      //localhost:4000
      console.log("Listening for requests on my awesome port " + port);
    });
  }).catch((e) => {
    //console.log(process.env.mongoUserName);
    return console.log("Error:::" + e);
  });