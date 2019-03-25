const mongoose = require("mongoose");

//Crate nem model for subpages

var Subpage = mongoose.model("Subpage",{
    page: {
        type: String,
        required: true,
        minlength:1,
        trim:true, //white space is not counting to be sign
        unique:true
    },
    block:{ //block of contents Array
        type: Object,
        required:true
    },
    background:{
        type: Object,
        default:false,
        required: false,
    }
})

module.exports = { Subpage };

