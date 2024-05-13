const express = require('express');
const router = express.Router();
const { createUser, loginUser,loginUserToken } = require('../controllers/userController');
const {verifyToken} = require('../middleware/verify')

router.post('/signup', createUser);
router.post('/login', loginUser);
router.post('/loginToken',loginUserToken)

module.exports = router;
