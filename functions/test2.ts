import { createServer } from '@graphql-yoga/node'

const server = createServer({
  schema: {
    typeDefs: `#graphql
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'world from test2'
      }
    }
  },
  logging: false
})

export default server
