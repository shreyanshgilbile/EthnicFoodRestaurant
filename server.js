const dotenv=require("dotenv");
const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const user = require('./routes/api/userRoutes');
const products = require('./routes/api/productRoutes');
const orders = require('./routes/api/orderRoutes');
const publicPath = path.join(__dirname, 'client', 'public');
//const port = process.env.PORT || 3000;



const PORT=3000;
const DB='mongodb://localhost:27017/test';

//connect to database
mongoose.connect(DB,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
     .then(() => console.log("database connected"))
     .catch(err => console.log(err));

     
app.use(express.static(publicPath));
app.use(express.json());

app.use('/user', user);
app.use('/products', products);
app.use('/orders', orders);

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
   console.log('Server is up!');
});