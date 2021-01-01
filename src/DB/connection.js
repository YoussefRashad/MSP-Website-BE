
const mongoose = require('mongoose');
const DB_URL = require('../utils/URL').DB_URL

mongoose.connect(process.env.MONGODB_URL || DB_URL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});