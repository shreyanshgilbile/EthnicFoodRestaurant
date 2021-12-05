const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const auth = require('../../middleware/auth');
const {Users} = require('../../Schemas/Users');



router.post('/register', async (req, res) => {

    console.log('Call to register');
    console.log("Request body:", req.body)
    const {name, email, phnno, password} = req.body;



    //check if user already exists.
    const check = await Users.findOne({email});     
    if(check) { return res.status(400).send({"message" : "User already exists"}); }

    //check if password meets all the requirements
    if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        return res.status(400).send({"message" : "Password doesn't meet all requirements"});
    }

    //validate email
    if(!validator.isEmail(email)) {
        return res.status(400).send({"message" : "Invalid Email Address"});
    }    

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create User document
    const user = new Users({
        name,
        email,
        phnno,
        password : hashedPassword
    });

    //Generate and assign Token to user
    const token = jwt.sign({_id : user._id}, 'ARADHITA');
    user.currentToken = token;

    //save user to database
    try {
        const savedUser = await user.save();
        //if successfully saved, send user details
        res.header('auth-token',token);
        res.send({user : {_id : savedUser._id, name, isAdmin : savedUser.isAdmin}});
    } catch(err) {
        console.log(err);
        res.status(400).send({"message" : "Error during validation"});
    }
});



router.post('/login',async (req, res) => {
    const {email, password} = req.body;
    
    //check if the user exists
    const user = await Users.findOne({email});
    if(!user) { return res.status(400).send({"message" : "Invalid email or password"}); }

    //verify the password
    const compare = await bcrypt.compare(password, user.password);
    if(!compare) { return res.status(400).send({"message" : "Invalid email or password"}); }

    //if the user is verified, then set token
    const token = jwt.sign({_id : user._id}, 'ARADHITA');
    user.currentToken = token;
    await user.save();
    res.header('auth-token',token);
    res.send({user : {_id : user._id, name : user.name, isAdmin : user.isAdmin}});
});



router.post('/logout', auth ,async (req, res) => {
    
    req.user.currentToken = "null";
    await req.user.save();

    //response to send, if successfull
    res.send({"message" : "success"});
});


router.get('/', auth ,async (req, res) => {
    // delete req.user.password;
    // console.log(req.user);
    res.send({user : {_id : req.user._id, name : req.user.name, isAdmin : req.user.isAdmin}});
});




//Export Router
module.exports = router;