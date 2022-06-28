// initialize mongodb connection

const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27107/cookitdb';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(databaseURL, options);

module.exports = mongoose;