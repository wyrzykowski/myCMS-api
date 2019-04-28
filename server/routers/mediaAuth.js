const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const router = new express.Router();
const appName  = process.env.APP_NAME;
const User = require('../models/user');

//This get token from media API, verified it and return false of true if user was verified

router.post(`/${appName}/media-auth`,async (req, res) => { //this firstly run middleware auth function and if no errors there send users list
    console.log("ROBIE MEDIA")
    try{
        const {token} = req.body;
        const decoded = jwt.verify(token, 'token12b8a7s63hz7dfj3');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });//find token in user with user_id in tokens array
        if (!user) {
            res.send({authorized:false})
        }
        else  res.send({authorized:true})

    }catch(e){
        // console.log(e)
        res.status(500).send()
    }
});

module.exports = router;