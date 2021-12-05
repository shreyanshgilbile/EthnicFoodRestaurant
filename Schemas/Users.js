//Imports
const mongoose = require('mongoose');
const validator = require('validator');

//create Users Schema
const usersSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minlength : 3,
        validate(value) {
            if(!value.match(/^[a-zA-Z\s]*$/)) {
                throw new Error("Name field should contain only letters");
            }
        }
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Address");
            }
        }
    },
    phnno : {
        type : String,
        required : true,
        trim : true,
        minlength : 10,
        maxlength : 10,
        validate(value) {
            if(!validator.isMobilePhone(value,'en-US')) {
                throw new Error("Invaild Mobile Number");
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minlength : 8
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    currentToken : {
        type : String,
        default : "null"
    }
});


usersSchema.virtual('orders', {
    ref : 'Orders',
    localField : '_id',
    foreignField : 'customerID'
});

//Export Users Model
module.exports.Users = mongoose.model('Users',usersSchema);