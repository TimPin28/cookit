const express = require(`express`);
const router = express.Router();
const controller = require(`../controllers/controller.js`);
const {registerValidation, loginValidation} = require('../validators.js');
const {isPublic, isPrivate} = require('../middlewares/checkAuth.js');

// home page views
router.get('/', controller.getIndex);
router.get('/alpbt', controller.getAlpbt);

router.get('/create', isPrivate, controller.getCreate);
router.get('/settings', isPrivate, controller.getSettings);
router.get('/login', isPublic, controller.getLogin);
router.get('/register', isPublic, controller.getRegister);
router.get('/profile/:username', controller.getProfile);
router.get('/profile/:username/alpbt', controller.getProfilealpbt);
router.get('/delete-comment/:_id', controller.deleteComment);


router.post('/register', isPublic, registerValidation, controller.registerUser);
router.post('/login', isPublic, loginValidation, controller.loginUser);
router.post('/submit-post', isPrivate, controller.submitPost);
router.post('/comment-post', isPrivate, controller.commentPost);
router.post('/search-post', controller.searchPost);

router.get('/logout', isPrivate, controller.logoutUser);

router.get('/viewPost', controller.viewPost);
router.get('/delete-post', controller.deletePost)

router.get('/deleteUser', controller.deleteUser);
router.post('/changepfp', controller.changepfp)

module.exports = router;