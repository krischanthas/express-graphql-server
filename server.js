const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

// allow cross-origin requests
app.use(cors());

dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
      console.log('connected to mongoDB');
})

// setup graphql endpoint
app.use("/graphql", graphqlHTTP({
      schema: schema, // pass schema
      graphiql: true // show graphiql interface
}))

app.listen(4000, () => {
      console.log("now listening for request on port 4000");
});
