const db = require('../database/models/connection.js');

const controller = {
    getIndex: function(req, res) {
        res.render('index');
    },

    getCreate: function(req, res) {
        res.render('create');
    },

    getSettings: function(req, res) {
        res.render('settings');
    },

    getProfile: function(req, res) {
        res.render('profile');
    }
}

module.exports = controller;