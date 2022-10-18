const { validateChange, validateCreate, productAvailability,
  calculatePrice, ingredientAvailability } = require("../validation/validation")

const { v4: uuidv4 } = require('uuid');

const Order = require("../models/orderModel");
const Food = require("../models/foodModel");

let products = []
Food.find().then(result => {
  products = result
});

module.exports.getAllOrders = async (req, res, next) => {
  Order.find().then(result => {
    res.send(result.filter(item => item.username === req.query.username));
  });
};

module.exports.createNewOrder = async (req, res, next) => {
  const body = req.body;
  //const price = products[0].menu.find(item => item.name === body.title).price
  ingredientAvailability(body, products)
  
  if (validateCreate(body) && productAvailability(body, products)) {
    const order = new Order({
      title: body.title,
      orderId: uuidv4(),
      amount: body.amount,
      price: calculatePrice(body, products),
      username: body.username,
      sizes: body.sizes,
      breads: body.breads,
      vegetables: body.vegetables,
      sauces: body.sauces,
      fillings: body.fillings
    });
    await order.save().then(result => Order.find({ username: body.username }))
      .then(result => { res.send(result) });
  } else if (validateCreate(body) && productAvailability(body, products)) {
    const order = new Order({
      title: body.title,
      orderId: uuidv4(),
      amount: body.amount,
      price: products[0].menu.find(item => item.name === body.title).price,
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
  if (validateChange(body)) {
    Order.updateOne({ orderId: req.body.orderId }, {
      amount: body.amount,
      price: body.price,
      sizes: body.sizes,
      breads: body.breads,
      vegetables: body.vegetables,
      sauces: body.sauces,
      fillings: body.fillings
    }).then(result => {
      Order.find({ username: body.username }).then(result => {
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

