const { v4: uuidv4 } = require('uuid');

const Order = require("../models/orderModel");

module.exports.getAllOrders = async (req, res, next) => {
    Order.find({ userName: req.query.userName }).then(result => {
    res.send(result);
  });
};

module.exports.createNewOrder = async (req, res, next) => {
  const body = req.body;
  if (body.hasOwnProperty('sizes')
    && body.hasOwnProperty('breads')
    && body.hasOwnProperty('vegetables')
    && body.hasOwnProperty('sauces')
    && body.hasOwnProperty('fillings')) {
    const order = new Order({
        id: body.id,
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
  } else {
    res.status(422).send('Error! Params not correct');
  }
}

module.exports.changeOrderInfo = (req, res, next) => {
  const body = req.body;
  if (body.hasOwnProperty('orderId')
        && (body.hasOwnProperty('id')
        || body.hasOwnProperty('sizes')
        || body.hasOwnProperty('breads')
        || body.hasOwnProperty('vegetables')
        || body.hasOwnProperty('sauces')
        || body.hasOwnProperty('fillings'))) {
    Order.updateOne({ orderId: req.body.orderId }, {
        id: req.body.id,
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
  Order.deleteOne({ username: req.query.username, id: req.query.id }).then(result =>
    Order.find({ username: req.query.username }).then(result => {
      res.send(result)
    }))
}

