const { GraphQLServer } = require('graphql-yoga')

let sampleDogs = [
    {breed: 'Apple', age: 2, id: '1'},
    {breed: 'Banana', age: 3, id: '2'},
    {breed: 'Orange', age: 6, id: '3'},
    {breed: 'Melon', age: 4, id: '4'},
  ]

  
  const typeDefs = `
    type Query {
      dogs: [Dog!]!
    }
    type Dog {
      breed: String!
      id: String
      age: Int!
    }
    type Mutation {
        addDog(breed: String!, age: Int!): Dog
        deleteDog(id: String, breed: String): Dog
        updateDog(breed: String!, age: Int!): Dog
    }
  `
  
  const resolvers = {
    Query: {
      dogs: () => sampleDogs,
    },
    Mutation: {
        addDog: (parent, args, context, info )=> {
            console.log('args', args)
            console.log('sampleDogs', sampleDogs)
            sampleDogs=[...sampleDogs, {...args,id:sampleDogs.length+1}]
            return {...args,id:sampleDogs.length+1}
        },
        deleteDog: (parent, args, context, info )=> {
          console.log('deleteDog', args)
          sampleDogs = sampleDogs.filter(( dog ) => {
            return dog.id !== args.id
          });
          return {args}
        },
        updateDog: (parent, args, context, info )=> {
          sampleDogs=[...sampleDogs]
            return {args}
      },
    }
  }
  
  const options = { port: 4000 }
  const server = new GraphQLServer({ typeDefs, resolvers })
  server.start(options, () => console.log('Server is running on localhost:' + options.port))