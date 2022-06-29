const express = require(`express`);
const router = express.Router();
const controller = require(`../controllers/controller.js`);

router.get('/', controller.getIndex);
router.get('/create', controller.getCreate);
router.get('/settings', controller.getSettings);
router.get('/login', controller.getLogin);
router.get('/register', controller.getRegister);
router.get('/profile', controller.getProfile);


router.post('/register', controller.registerUser);
router.post('/submit-post', controller.submitPost);

router.get('/viewPost', controller.viewPost);



module.exports = router;