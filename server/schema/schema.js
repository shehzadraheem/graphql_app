const graphql = require('graphql');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,

} = graphql

/// Create Types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentaion for users...',
    fields: ()=> ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root query',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
    
            resolve(parent, args) {
    
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})