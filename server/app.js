const express = require('express');
const graphqlHTTP = require('graphql-express');

const app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true
}))

app.listen(4000, ()=> {
    console.log('Hello');
});