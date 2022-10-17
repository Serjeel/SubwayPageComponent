const { v4: uuidv4 } = require('uuid');

const Order = require("../models/orderModel");

module.exports.getAllOrders = async (req, res, next) => {
  Order.find().then(result => {
    res.send(result.filter(item => item.username === req.query.username));
  });
};

module.exports.createNewOrder = async (req, res, next) => {
  const body = req.body;
  if (body.hasOwnProperty('title')
    && body.hasOwnProperty('amount')
    && body.hasOwnProperty('price')
    && body.hasOwnProperty('username')
    && body.hasOwnProperty('sizes')
    && body.hasOwnProperty('breads')
    && body.hasOwnProperty('vegetables')
    && body.hasOwnProperty('sauces')
    && body.hasOwnProperty('fillings')) {
    const order = new Order({
      title: body.title,
      orderId: uuidv4(),
      amount: body.amount,
      price: body.price,
      username: body.username,
      sizes: body.sizes,
      breads: body.breads,
      vegetables: body.vegetables,
      sauces: body.sauces,
      fillings: body.fillings
    });
    await order.save().then(result => Order.find({ username: body.username }))
      .then(result => { res.send(result) });
  } else if (body.hasOwnProperty('title')
    && body.hasOwnProperty('amount')
    && body.hasOwnProperty('price')
    && body.hasOwnProperty('username')) {
    const order = new Order({
      title: body.title,
      orderId: uuidv4(),
      amount: body.amount,
      price: body.price,
      username: body.username
    });
    await order.save().then(result => Order.find({ username: body.username }))
      .then(result => { res.send(result) });
  } else {
    res.status(422).send('Error! Params not correct');
  }
}

module.exports.changeOrderInfo = (req, res, next) => {
  const body = req.body;
  if (body.hasOwnProperty('orderId')
    && (body.hasOwnProperty('amount')
      || body.hasOwnProperty('price')
      || body.hasOwnProperty('sizes')
      || body.hasOwnProperty('breads')
      || body.hasOwnProperty('vegetables')
      || body.hasOwnProperty('sauces')
      || body.hasOwnProperty('fillings'))) {
    Order.updateOne({ orderId: req.body.orderId }, {
      amount: req.body.amount,
      price: req.body.price,
      sizes: req.body.sizes,
      breads: req.body.breads,
      vegetables: req.body.vegetables,
      sauces: req.body.sauces,
      fillings: req.body.fillings
    }).then(result => {
      Order.find({ orderId: body.orderId }).then(result => {
        res.send(result);
      });
    })
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.deleteOrder = (req, res, next) => {
  Order.deleteOne({ orderId: req.query.orderId }).then(result =>
    Order.find({ username: req.query.username }).then(result => {
      res.send(result)
    }))
}

