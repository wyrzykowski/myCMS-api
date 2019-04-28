const mongoose = require("mongoose");

//Crate nem model for subpages

var Pages = mongoose.model("Pages",{
    page_name: {
        type: String,
        required: true,
        minlength:1,
        trim:true, //white space is not counting to be sign
        unique:true
    },
    page_link: {
        type: String,
        required: true,
        minlength:1,
        trim:true, //white space is not counting to be sign
        unique:true
    }
});

module.exports = { Pages };
