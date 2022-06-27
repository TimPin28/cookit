const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    _id: String,
    date: Date,
    image: String,
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;