const graphql = require('graphql');
var _ = require('lodash');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,

} = graphql


/// dummy data

let userData = [
    {id: '1', name: 'Shehzad', age: 23, profession: 'Programmer'},
    {id: '2', name: 'Raheem', age: 24, profession: 'Crickter'},
    {id: '3', name: 'Test', age: 25, profession: 'Nothing'},
]

/// Create Types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentaion for users...',
    fields: ()=> ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
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
                return _.find(userData, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})