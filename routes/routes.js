const express = require(`express`);
const controller = require(`../controllers/controller.js`);

const app = express();

app.get('/', controller.getIndex);
app.get('/create', controller.getCreate);
app.get('/settings', controller.getSettings);
app.get('/profile', controller.getProfile);
app.get('/viewPost', controller.viewPost);

app.post('/submit-post', controller.submitPost);

module.exports = app;
