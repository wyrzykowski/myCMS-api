var mongoose = require("mongoose");


//Mongoose default use callbacks but here I will use Promises
mongoose.Promise = global.Promise;

var uri = process.env.MONGODB_URI;

mongoose.connect(uri);

module.exports = {
  mongoose
};