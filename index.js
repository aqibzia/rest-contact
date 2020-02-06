// Import express
const express = require('express');

// Import routes
const apiRoutes = require("./api-routes");

// Import Body parser
const bodyParser = require('body-parser');

// import cors
var cors = require('cors');

// Import Mongoose
const mongoose = require('mongoose');

// Initialize the app
const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');

// mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true })
    .then(() => {
        console.log("Db connected successfully");
    }).catch(() => {
        console.log("Error connecting db");
    });

// const db = mongoose.connection;
//
// // Added check for DB connection
// if(!db)
//     console.log("Error connecting db");
//  else
//     console.log("Db connected successfully");

// Use Api routes in the App
app.use('/api', apiRoutes);

// Setup server port
const port = process.env.port || 4000;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express and Nodemon'));

// Launch app to listen to specified port
app.listen(port, () => console.log("Running RestHub on port " + port));