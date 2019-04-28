const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const {Statistics} = require('../models/statistics');
const appName  = process.env.APP_NAME;


router.get(`/${appName}/statistics`, auth, async (req, res) => { //this firstly run middleware auth function and if no errors there send users list
    try{
        const allStatistics = await Statistics.find({});
        res.send(allStatistics)
    }catch(e){
        res.status(500).send()
    }
});

module.exports = router;