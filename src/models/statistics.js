const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

//Crate nem model for subpages

var Statistics = mongoose.model("Statistics",{
    date: { //block of contents Array
        type: String,
        required: true,
        unique:true
    },

    viewCounter: {
        type: Number,
        required: true
    }
});

module.exports = {Statistics};

