const express = require('express');
const router = express.Router();
const { createUser,loginUser, getAllUsers } = require('../controllers/userController');
const {verifyToken} = require('../middleware/verify')

router.post('/signup', createUser);
router.post('/login',loginUser)
router.get('/allUsers',verifyToken("admin"), getAllUsers )

module.exports = router;
