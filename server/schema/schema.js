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

let hobbyData= [
    {id: '1', title: 'Programming', description: 'Every time code'},
    {id: '2', title: 'Playing', description: 'Every time playing cricket'},
    {id: '3', title: 'Cooking', description: 'Every time cooking'},
    
]

/// Create Types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentaion for users...',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentaion for hobby...',
    fields: ()=> ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
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
        },

        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(hobbyData, {id: args.id})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})