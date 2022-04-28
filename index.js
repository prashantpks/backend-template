const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');
connectToMongo();
require('dotenv').config();

const app = express();
app.use(express.json());


//Available Routes
app.use('/',require('./src/routes/report.route'));


const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log(`Currently Listening at http://localhost:${port}`);
});
