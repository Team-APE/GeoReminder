const mongoose = require('mongoose')

// Use different database URIs based on whether an env var exists.
var dbUri = 'mongodb://dev:#n<-fPOt6a6/@ds013182.mlab.com:13182/georeminder'

// if (!dbUri) {
//   console.log("this does something?")
//   // check that MongoD is running...
//   require('net').connect(27017, 'localhost').on('error', function() {
//     console.log("YOU MUST BOW BEFORE THE MONGOD FIRST, MORTAL!");
//     process.exit(0);
//   });
// }
console.log("Connect to mongo", dbUri);
mongoose.connect(dbUri);

module.exports = mongoose;
