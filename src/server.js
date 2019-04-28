require("./config/config.js");
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
//DATA BASE
const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose.js");
const {Subpage} = require("./models/subpage");
const {Pages} = require("./models/pages");
const fakeDb = require("./db/fakeDb");
var app = express();
const port  = process.env.PORT;
const cors = require("cors");
const {Navbar} = require("./models/navbar");
const userRouter = require('./routers/user');
const subpageRouter = require('./routers/subpage');
const pageRouter = require('./routers/page');
const appInfoRouter = require('./routers/info');
const navRouter = require('./routers/nav');
const statisticsRouter = require('./routers/statistics');
const mediaRouter = require('./routers/mediaAuth');

app.use(bodyParser.json()); //body parser will automatically parse JSON to object JS when req sth.
app.use(cors());


const appName='fakfajzer';

//diagnostic utils

// app.use((req,res,next)=>{
//     console.log(req.path);
//     if(req.path==="/fakfajzer/users/me")
//     // console.log(req);
//     next();
// });

// app.use((req,res,next)=>{
//     res.status(503).send('Server is temporary down.')
// });
app.use(mediaRouter);
app.use(statisticsRouter);
app.use(navRouter);
app.use(appInfoRouter);
app.use(userRouter);
app.use(subpageRouter);
app.use(pageRouter);


app.listen(port,()=>{
    console.log(`started server on port ${port}`);
});

module.exports = {app};

