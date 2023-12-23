const graphql = require('graphql');
var _ = require('lodash');
const User = require("../model/user");
const Hobby = require("../model/hobby");
const Post = require("../model/post");
const user = require('../model/user');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull

} = graphql


/// dummy data

// let userData = [
//     {id: '1', name: 'Shehzad', age: 23, profession: 'Programmer'},
//     {id: '2', name: 'Raheem', age: 24, profession: 'Crickter'},
//     {id: '3', name: 'Test', age: 25, profession: 'Nothing'},
// ]

// let hobbyData= [
//     {id: '1', title: 'Programming', description: 'Every time code', userId: '1'},
//     {id: '2', title: 'Playing', description: 'Every time playing cricket', userId: '2'},
//     {id: '3', title: 'Cooking', description: 'Every time cooking', userId: '1'},
// ]

// let postData = [
//     {id: '1', comment: 'New post', userId: '1'},
//     {id: '2', comment: 'Old post', userId: '2'},
//     {id: '3', comment: 'Previous post', userId: '1'},
// ]

/// Create Types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentaion for users...',
    fields: ()=> ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
              //  return _.filter(postData, {userId: parent.id})
              return Post.find({userId: parent.id});
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                //return _.filter(hobbyData, {userId: parent.id})
                return Hobby.find({userId: parent.id});
            }
        }
    })
});

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentaion for hobby...',
    fields: ()=> ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(userData, {id: parent.userId});
            }
        }
    })
});


const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Post description',
    fields: ()=> ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args){
                return _.find(userData, {id: parent.userId});
            }
        }
    
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

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return userData;
            }
        },

    
        hobby: {
            type: HobbyType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args) {
                return _.find(hobbyData, {id: args.id})
            }
        },

        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbyData;
            }
        },

        post: {
            type: PostType,
            args: {id: {type: GraphQLID}},

            resolve(parent, args){
                return _.find(postData, {id: args.id})
            }
        },

        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postData;
            }
        }
    }
});

//Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        // User
        CreateUser: {
            type: UserType,
            args: {
               // id: {type: GraphQLID},
                name: {type: GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLNonNull(GraphQLInt)},
                profession: {type: GraphQLNonNull(GraphQLString)},
            },

            resolve(parent, args){
                let user = User({
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                });
                return user.save();
            }
        },

        UpdateUser: {
            type: UserType,
            args: {
              id: { type: GraphQLNonNull(GraphQLString) },
              name: { type: GraphQLNonNull(GraphQLString) },
              age: { type: GraphQLNonNull(GraphQLInt) },
              profession: { type: GraphQLString },
            },
            resolve(parent, args) {
              return (updateUser = User.findByIdAndUpdate(
                args.id,
                {
                  $set: {
                    name: args.name,
                    age: args.age,
                    profession: args.profession,
                  },
                },
                { new: true } // send back the updated objecttype
              ));
            },
          },


         // Hobby 
         CreateHobby: {
            type: HobbyType,
            args: {
                //id: {type: GraphQLID},
                title: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                userId: {type: GraphQLNonNull(GraphQLID)},
            },

            resolve(parent, args){
                let hobby = Hobby({
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                });
                return hobby.save();
            }
        },

        UpdateHobby: {
            type: HobbyType,
            args: {
              id: { type: GraphQLNonNull(GraphQLString) },
              title: { type: GraphQLNonNull(GraphQLString) },
              description: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
              return (updatedHobby = Hobby.findByIdAndUpdate(
                args.id,
                {
                  $set: {
                    title: args.title,
                    description: args.description,
                  },
                },
                { new: true }
              ));
            },
          },


        // Post  
        CreatePost: {
            type: PostType,
            args: {
                //id: {type: GraphQLID},
                comment: {type: GraphQLNonNull(GraphQLString)},
                userId: {type: GraphQLNonNull(GraphQLID)},
            },

            resolve(parent, args){
                let post = Post({
                    comment: args.comment,
                    userId: args.userId
                });
                return post.save();
            }
        },

        UpdatePost: {
            type: PostType,
            args: {
              id: { type: GraphQLNonNull(GraphQLString) },
              comment: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
              return (updatedPost = Post.findByIdAndUpdate(
                args.id,
                {
                  $set: {
                    comment: args.comment,
                  },
                },
                { new: true }
              ));
            },
          },
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})