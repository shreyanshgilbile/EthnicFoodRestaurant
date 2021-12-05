const router = require('express').Router();
const {Products} = require('../Schemas/Products');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const products = [
    
    new Products({
    productName: "rasmalai",
    description: 'this is a dessert',
    category: 'dessert',
    price: 14,
    qty: 25,
    image: 'client/public/rasmalai.jpg'

    
}),
new Products({
    productName: "rasmalai2",
    descriptin: 'this is a dessert2',
    category: 'dessert2',
    price: 12,
    qty: 25,
    image: 'client/public/rasmalai.jpg'

    
})

];
let done=0;
for(let i=0;i<products.length;i++)
{
    products[i].save(function(err, result){
        done++;
        
        if(done== products.length){
            exit();
        }
    });
}
function exit()
{
    mongoose.disconnect();
}
