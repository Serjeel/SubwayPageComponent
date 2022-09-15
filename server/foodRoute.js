const express = require('express');
const router = express.Router();

const {
getAllFood
} = require('./foodController');

router.get('/getAllFood', getAllFood);

module.exports = router;