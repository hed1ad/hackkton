const router = require('express').Router();
const {
  createUser,
  login,
  logout,
} = require('../controllers/user');


router.post('/signup',  createUser);
router.post('/signin',  login);
router.delete('/signout', logout);

module.exports = router;
