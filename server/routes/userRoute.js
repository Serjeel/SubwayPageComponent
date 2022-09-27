const express = require('express');
const router = express.Router();

const { 
    getAllUsers,
    login,
    register,
    protected
 } = require('../controllers/userController');

router.get('/getAllUsers', getAllUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/protected', protected);

module.exports = router;