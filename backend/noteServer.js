// import packages and helpers
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/notebook')
    .then(() => console.log('database connected successfully'))
    .catch((error) => console.error('Connection unsuccessful. Error:', error))


app.use('/api', noteRoutes);

// request listener
const port = 5000;
app.listen(port, () => {
    console.log(`server is running at port: ${port}`)
})
