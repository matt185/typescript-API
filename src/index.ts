import "reflect-metadata";
import express from "express";
import { ConnectionOptions, createConnection } from "typeorm";
import dbConfig from "./ormconfig"
import cors from "cors";
import {ApolloServer} from "apollo-server-express";
import {buildSchema} from "type-graphql"
import { UserResolver } from "./resolvers/user";

const app = express();

(async ()=>{

    //! set db connections

    await createConnection(dbConfig as ConnectionOptions)
   
    //! set cors

    app.use(cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }))

    //! set graphql

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[UserResolver],
            validate:false
        }),
    })

    apolloServer.applyMiddleware({
        app,
        cors:false})

    app.listen(4000,()=>{
        console.log("server started on localhost:4000");
    })
})()