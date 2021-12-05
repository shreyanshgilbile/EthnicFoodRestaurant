const jwt = require('jsonwebtoken');
const {Users} = require('../Schemas/Users');

//authenticate user
const auth = async (req, res, next) => {
    try {
    
        const token = req.headers['auth-token'];
        if(!token) { return res.status(401).send({"message" : "Unauthorized Access! Please Login or Register first"}); }
        //verify the token
        const decoded = jwt.verify(token, 'ARADHITA');
        const user = await Users.findOne({_id : decoded._id, currentToken : token});
        if(!user) {
            return res.status(401).send({"message" : "Access Denied!"});
        }
        
        req.user = user;
        next();
    } catch(err) {
        res.status(401).send({"message" : "Kindly Authenticate"});
    }
}


module.exports = auth;