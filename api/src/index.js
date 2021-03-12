const express = require('express'),
      mongoose = require('mongoose'),
      {ApolloServer} = require('apollo-server-express'),
      resolvers = require('./resolver'),
      {typeDefs} = require('./typeDef'),
      config = require('./config.json');
    
const server = async()=>{
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await mongoose.connect(`mongodb+srv://${config.dbuser}:${config.dbpass}${config.dblink}${config.dbname}?retryWrites=true&w=majority??ssl=true`,{useNewUrlParser:true,useFindAndModify: false}).catch(err=>{console.log(err)});
    server.applyMiddleware({app});
    const port = process.env.PORT || 5000;
    app.listen({port:port},()=>{
        console.log(`Server started on port ${port}`)
    });
}
server();