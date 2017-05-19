const mongoose = require('mongoose')

if (process.env.DB_URI) {
  mongoose.connect(process.env.DB_URI, () => {
    console.log("Connect to mongo", process.env.DB_URI);
  })
} else {
  throw new Error('DB_URI Not provided!')
}

module.exports = mongoose;
