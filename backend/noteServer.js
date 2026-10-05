// import packages and helpers
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes.js');
const connectDB = require('./config/db.js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', noteRoutes);

// request listener
const port = 5000;
app.listen(port, () => {
    console.log(`server is running at port: ${port}`)
})
