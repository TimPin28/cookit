const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email:    {type: String, required: true, unique: true},
    password: {type: String, min: 6, required: true},
    date:     {type: Date, default: Date.now},
    pfp:      {type: String, default: '/images/pfp/default.png'}
});

const User = mongoose.model('User', UserSchema);

exports.create = function(obj, next) {
    const user = new User(obj);
  
    user.save(function(err, user) {
      next(err, user);
    });
};
  
  exports.getById = function(id, next) {
    User.findById(id, function(err, user) {
      next(err, user);
    });
};

exports.getOne = function(query, next) {
    User.findOne(query, function(err, user) {
      next(err, user);
    });
};

exports.delete = function(conditions, next) {
    User.deleteOne(conditions, function (error, user) {
      next(error, user);
    });
}

exports.update = function(filter, update, next) {
    User.updateOne(filter, update, function(error, user) {
      next(error, user);
    });
}