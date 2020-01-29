//Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB =
  'mongodb+srv://admin:rajeshbca@cluster0-9maia.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;
