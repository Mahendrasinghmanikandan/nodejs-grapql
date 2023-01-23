const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");


const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const resolvers2 = require("./resolvers2");
app.use(cookieParser());

async function createApolloServer() {
        const apolloServer = new ApolloServer({
                typeDefs,
                resolvers: {
                        ...resolvers,
                        ...resolvers2
                }
        });

        await apolloServer.start();
        apolloServer.applyMiddleware({ app: app });
        app.use((req, res) => {
                res.send("hello server")
        })

        mongoose.connect("mongodb://127.0.0.1:27017/storage").then(() => {
                app.listen(8080, () => {
                        console.log("server Started");
                })
        }).catch(err => {
                console.log(err, "err");
        })
}


createApolloServer();