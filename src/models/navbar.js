const mongoose = require("mongoose");

//Crate nem model for subpages

var Navbar = mongoose.model("Navbar",{
    navbar_name: {
        type: String,
        required: true,
        minlength:1,
        trim:true, //white space is not counting to be sign
        unique:true
    },
    navbar_label: {
        type: String,
        required: true,
        minlength:1,
        trim:true, //white space is not counting to be sign
        unique:true
    },
    content:{ //block of contents Array
        type: Object,
        required:true
    }
})

module.exports = { Navbar };
