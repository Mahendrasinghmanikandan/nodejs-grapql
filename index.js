const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(cors({
        Origin: "http://localhost:8080/graphql",
        Credentials: true
}));


const typeDefs = require("./graphQL/typeDefs/typeDefs");
const resolvers = require("./graphQL/resolvers/index");


async function createApolloServer() {
        const apolloServer = new ApolloServer({
                typeDefs,
                resolvers,
                context: ({ req, res }) => ({ req, res })
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