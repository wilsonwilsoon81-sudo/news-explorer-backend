const router = require('express').Router();
const { validateUserBody, validateLoginBody } = require('../middlewares/validation');
const { createUser, login, getUserInfo } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateLoginBody, login);

router.get('/users/me', auth, getUserInfo);

module.exports = router;
