const express = require(`express`);
const router = express.Router();
const controller = require(`../controllers/controller.js`);

//const app = express();

router.get('/', controller.getIndex);
router.get('/create', controller.getCreate);
router.get('/settings', controller.getSettings);
router.get('/login', controller.getLogin);
router.get('/register', controller.getRegister);
router.get('/profile', controller.getProfile);
router.get('/viewPost', controller.viewPost);

router.post('/submit-post', controller.submitPost);

module.exports = router;