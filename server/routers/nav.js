const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();
const appName  = process.env.APP_NAME;
const _ = require("lodash");
const {Navbar} = require("./../models/navbar");


router.get(`/${appName}/nav/:navbar_name`,(req,res)=>{
    Navbar.find({
        navbar_name:req.params.navbar_name
    }).then(
        page=>{
            res.send(page);
        },
        e=>{
            res.status(400).send(e);
        });
});


router.post(`/${appName}/nav`,auth,(req,res)=>{
    var navBar = new Navbar({
        navbar_name: req.body.navbar_name,
        navbar_label: req.body.navbar_label,
        content: req.body.content
    });

    navBar.save().then(
        doc=>{
            res.send(doc);
        },
        e=>{
            res.status(400).send(e);//if can't save subpage send error status 400
        }
    )
});

router.patch(`/${appName}/nav/:navName`,auth,(req,res)=>{
    var body = _.pick(req.body, ["navbar_label", "content"]); // pick allows to modify this properties

    const navbar_name = req.params.navName;
    const navbar_label = req.body.navbar_label;
    const content = req.body.content;

    Navbar.findOneAndUpdate(
        { navbar_name: navbar_name },
        { $set: body },
        { new: true }
    )
        .then(navbar => {
            // {new:true}  means that here will return updated object.
            if (!navbar) return res.status(404).send();
            res.send(navbar);
        })
        .catch(e => {
            res.status(400).send();
        });
});

module.exports = router;
