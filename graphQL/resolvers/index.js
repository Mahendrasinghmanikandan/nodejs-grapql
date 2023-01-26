const authResolvers = require("./authResolvers");
const articleResolvers = require("./articleResolvers");
const resolvers = {
        Query: {
                ...authResolvers.Query,
                ...articleResolvers.Query
        },
        Mutation: {
                ...authResolvers.Mutation,
                ...articleResolvers.Mutation
        }
}

module.exports = resolvers;