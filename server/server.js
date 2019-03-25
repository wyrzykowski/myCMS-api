require("./config/config.js");
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
//DATA BASE
const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose.js");
const {Subpage} = require("./models/subpage");
const fakeDb = require("./db/fakeDb");
var app = express();
const port  = process.env.PORT;
const cors = require("cors");
const {Navbar} = require("./models/navbar");

app.use(bodyParser.json()); //body parser will automatically parse JSON to object JS when req sth.
app.use(cors());
const info ={name:'mycms',ver:' 1.0.0',dedicated:'Fakfajzer',author:'Karol Wyrzykowski'}
const appName='fakfajzer';
app.get(`/${appName}/myCMS`,(req,res)=>{
    res.send(info)
});

app.get(`/${appName}/nav/:navbar_name`,(req,res)=>{
    Navbar.find({
        navbar_name:req.params.navbar_name
    }).then(
        page=>{
            res.send(page);
        },
        e=>{
            res.status(400).send(e);
        });
})


app.get(`/${appName}/:page`,(req,res)=>{
    console.log(req.params.page)
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
})
app.post(`/${appName}/subpage`,(req,res)=>{
    var subpage = new Subpage({
        page: req.body.page,
        block: req.body.block
    });

    subpage.save().then(
        doc=>{
            res.send(doc);
        },
        e=>{
            res.status(400).send(e);//if can't save subpage send error status 400
        }
    )
})

app.post(`/${appName}/navbar`,(req,res)=>{
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
})


app.patch(`/${appName}/edit/:page`, (req, res) => {
    console.log(req)
    var page = req.params.page;
    //ZABEZPIECZENIE ŻEBY UŻYTKWONIK NIE MÓGŁ UPDETOWAC WSZYSTKIEGO!
    var body = _.pick(req.body, ["background", "page","block"]); // pick pozwala tylko na modyfikowanie tych wartości jakie sa w nawiasach!!!


    Subpage.findOneAndUpdate(
        { page: page }, //_creator: req.user._id
        { $set: body },
        { new: true }
    )
        .then(subpage => {
            //to {new:true} oznacza, ze zwóci zupdetowany obiekt
            if (!subpage) return res.status(404).send();
            res.send(subpage);
        })
        .catch(e => {
            res.status(400).send();
        });
});

app.listen(port,()=>{
    console.log(`started server on port ${port}`);
});

module.exports = {app};