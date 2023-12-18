const graphql = require('graphql');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,

} = graphql

/// Create Types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentaion for users...',
    filelds: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});