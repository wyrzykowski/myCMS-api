var mongoose = require("mongoose");

//Mongoose default use callbacks but here I will use Promises
mongoose.Promise = global.Promise;


//use this if development

// var uri = process.env.MONGODB_URI;
// mongoose.connect(uri);
if (process.env.MONGODB_URI_DEV) {
  var uri =process.env.MONGODB_URI_DEV;
}else {
  var uri =
      "mongodb://" +
      process.env.MONGODB_URI +
      "@cluster0-shard-00-00-royto.mongodb.net:27017,cluster0-shard-00-01-royto.mongodb.net:27017,cluster0-shard-00-02-royto.mongodb.net:27017/ToooApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
}
mongoose.connect(uri);


module.exports = {
  mongoose
};