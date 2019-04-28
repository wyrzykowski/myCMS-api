const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    console.log("try auth");
    try {
        console.log("Auth...")
        const token = req.header('Authorization').replace('Bearer ', ''); // remove Bearer from  header value string
        const decoded = jwt.verify(token, 'token12b8a7s63hz7dfj3');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });//find token in user with user_id in tokens array

        if (!user) {
            throw new Error()
        }
//this is to be sure that user is the same like the user_id in  generated token
        req.token = token;
        req.user = user;

        next()//if authoricated execute rest of code
    } catch (e) {
        console.log("401")
        res.status(401).send({ error: 'You are not authenticated.' })
    }
};

module.exports = auth;