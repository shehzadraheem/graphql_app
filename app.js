const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./server/schema/schema');
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))



mongoose.connect(
   //`mongodb+srv://shehzadraheemsr38:l4jRvlDuSaMLlADg@graphqlcluster.fpcxm.mongodb.net/testing?retryWrites=true&w=majority`
   `mongodb+srv://shehzadraheemsr38:l4jRvlDuSaMLlADg@graphqlcluster.ps4j1cj.mongodb.net/?retryWrites=true&w=majority`
   )
  .then(() => {
    console.log('Hello');
    app.listen(PORT, () => {
      //console.log(process.env.mongoUserName);
      //localhost:4000
      console.log("Listening for requests on my awesome port " + PORT);
    });
  }).catch((e) => {
    //console.log(process.env.mongoUserName);
     console.log("Error Found:::" + e);
  });

// const express = require('express')
// const mongoose = require('mongoose')

// const app = express()
// const PORT = process.env.PORT || 3000

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// }

// //Routes go here
// app.all('*', (req,res) => {
//     res.json({"every thing":"is awesome"})
// })

// //Connect to the database before listening
// connectDB().then(() => {
//     app.listen(PORT, () => {
//         console.log("listening for requests");
//     })
// })