const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const viewCounter = require('../middleware/viewCounter');
const router = new express.Router();
const appName  = process.env.APP_NAME;
const {Subpage} = require("./../models/subpage");
const _ = require("lodash");


router.post(`/${appName}/subpage`,auth,(req,res)=>{

    var subpage = new Subpage({
        page: req.body.page,
        block: req.body.block
    });

    subpage.save().then(
        doc=>{
            console.log("SUBAGAE");
            res.send(doc);
        },
        e=>{
            res.status(400).send(e);//if can't save subpage send error status 400
        }
    )
});


//Send pages for everyone
router.get(`/${appName}/:page`,viewCounter, (req,res)=>{
    // console.log(req.params.page);
    Subpage.find({
        page:req.params.page
    }).then(
        page=>{
            res.send(page);
        },
        e=>{
            res.status(400).send(e);
        }

    )
});



router.patch(`/${appName}/edit/:page`,auth, (req, res) => {

    var page = req.params.page;
    // console.log("edit",page)
    //ZABEZPIECZENIE ŻEBY UŻYTKWONIK NIE MÓGŁ UPDETOWAC WSZYSTKIEGO!
    var body = _.pick(req.body, ["background", "page","block"]); // pick allows to modify this properties


    Subpage.findOneAndUpdate(
        { page: page }, //_creator: req.user._id
        { $set: body },
        { new: true }
    )
        .then(subpage => {
            if (!subpage) return res.status(404).send();
            res.send(subpage);
        })
        .catch(e => {
            res.status(400).send();
        });
});

module.exports = router;
