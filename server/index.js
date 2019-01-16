const express = require('express');
const graphqlHTTP = require('express-graphql');
const Schema = require('./schema');

const app = express();

app.use('/graphql', graphqlHTTP({ 
    schema:Schema,
    graphiql:true
}))
app.listen(4000, () =>{
    console.log('now listening for request on port 4000');
    
})