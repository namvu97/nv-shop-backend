require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Import the library:
var cors = require('cors');

mongoose.connect(process.env.MONGO_URL);

const apiProductRoute = require('./api/routes/product.route')

const port = process.env.PORT || 7000;

const app = express();

// Then use it before your routes are set up:
app.use(cors());

app.use(express.json())

// Static folder
app.use('/images/products/', express.static(__dirname + '/public/images'));
    
app.use('/api/product', apiProductRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})