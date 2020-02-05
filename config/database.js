//Set up mongoose connection
require('dotenv').config();
const mongoose = require('mongoose');
const mongoDB = process.env.DBURL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;
