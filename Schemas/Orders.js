//Imports
const mongoose = require('mongoose');

//Create Orders Schema
const ordersSchema = new mongoose.Schema({
    customerID : {
        type : String,
        required : true,
        ref : 'Users'
    },
    items : [{
        productID : {
            type : String,
            required : true,
            ref : 'Products'
        },
        name : {
            type : String,
            required : true
        },
        qty : {
            type : Number,
            min : 1,
            required : true
        },
        price : {
            type : Number,
            required : true,
            ref : 'Products'
        }
    }],
    orderType : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value) {
            if(!(value === 'dinein' || value === 'pickup')) {
                throw new Error("Invalid order type");
            }
        }
    },
    bookingTime : {
        type : Date,
        required : true
    },
    totalBill : {
        type : Number,
        required : true
    }
});

//Export Orders Model
module.exports.Orders = mongoose.model('Orders',ordersSchema);