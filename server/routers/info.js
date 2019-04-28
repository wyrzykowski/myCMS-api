const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const appName  = process.env.APP_NAME;
const info ={name:'mycms',ver:' 1.0.0',dedicated:'Fakfajzer',author:'Karol Wyrzykowski'}


router.get(`/${appName}/myCMS`,(req,res)=>{
    console.log("INFO")
    res.send(info)
});

module.exports = router;