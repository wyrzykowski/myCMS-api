const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const appName  = process.env.APP_NAME;
const {Subpage} = require("./../models/subpage");
const {Pages} = require("./../models/pages");

router.get(`/${appName}/pages`,(req,res)=>{
    Pages.find({
        page_name:req.body.page_name
    }).then(
        page=>{
            res.send(page);
        },
        e=>{
            res.status(400).send(e);
        });
});

router.get(`/${appName}/pages/all`,(req,res)=>{
    let  pagesArray;
    Pages.find({},function(err,pages){
        pagesArray= pages;
    }).then(
        page=>{
            res.send(pagesArray);
        },
        e=>{
            res.status(400).send(e);
        });
});

router.patch(`/${appName}/pages`,auth, (req, res) => {
    var body = _.pick(req.body, ["page_link"]); // pick allows to modify this properties
    const page_name = req.body.page_name;
    Pages.findOneAndUpdate(
        { page_name: page_name },
        { $set: body },
        { new: true }
    )
        .then(pages => {
            if (!pages) return res.status(404).send();
            res.send(pages);
        })
        .catch(e => {
            res.status(400).send();
        });
});




router.post(`/${appName}/pages`,auth,(req,res)=>{
    var pages = new Pages({
        page_name: req.body.page_name,
        page_link: req.body.page_link
    });

    pages.save().then(
        doc=>{
            res.send(doc);
        },
        e=>{
            res.status(400).send(e);
        }
    )
});


module.exports = router;


