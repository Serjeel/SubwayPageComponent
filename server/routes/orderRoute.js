const express = require('express');
const router = express.Router();
const passport = require('passport');

const { 
    getAllOrders,
    createNewOrder,
    changeOrderInfo,
    deleteOrder
 } = require('../controllers/orderController');

router.get('/getAllOrders', getAllOrders);
router.post('/createNewOrder', createNewOrder);
router.patch('/changeOrderInfo', changeOrderInfo);
router.delete('/deleteOrder', deleteOrder);

module.exports = router;