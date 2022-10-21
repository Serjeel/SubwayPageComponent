const { validateChange, validateCreate, productAvailability,
  calculatePrice, ingredientAvailability, validateUserOrderCreation,
  validateUserOrderDeleteChange } = require("../validation/validation")

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
  const token = JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString());
  const body = req.body;
  //const price = products[0].menu.find(item => item.name === body.title).price
  if (validateUserOrderCreation(body, token)) {
    if (validateCreate(body) && productAvailability(body.title, products) &&
      ingredientAvailability(body, products)) {
      const order = new Order({
        title: body.title,
        orderId: uuidv4(),
        amount: body.amount,
        price: calculatePrice(body, body.title, products),
        username: body.username,
        sizes: body.sizes,
        breads: body.breads,
        vegetables: body.vegetables,
        sauces: body.sauces,
        fillings: body.fillings
      });
      await order.save().then(result => Order.find({ username: body.username }))
        .then(result => { res.send(result) });
    } else if (validateCreate(body) && productAvailability(body.title, products)) {
      const order = new Order({
        title: body.title,
        orderId: uuidv4(),
        amount: body.amount,
        price: calculatePrice(body, body.title, products),
        username: body.username
      });
      await order.save().then(result => Order.find({ username: body.username }))
        .then(result => { res.send(result) });
    } else {
      res.status(422).send('Error! Params not correct');
    }
  } else {
    res.status(422).send('Error! Incorrect user');
  }
}

module.exports.changeOrderInfo = async (req, res, next) => {
  const body = req.body;
  let selectedOrder = {}
  const token = JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString());
  let title = "";
  await Order.find({ orderId: body.orderId }).then(result => {
    title = result[0].title;
    selectedOrder = result[0];
  })
  if (validateUserOrderDeleteChange(token, selectedOrder)) {

    if (validateChange(body) && productAvailability(title, products)
      && ingredientAvailability(body, products) && selectedOrder.breads) {
      Order.updateOne({ orderId: req.body.orderId }, {
        title: Order.find({ orderId: body.orderId }).title,
        amount: body.amount,
        price: calculatePrice(body, title, products),
        sizes: body.sizes,
        breads: body.breads,
        vegetables: body.vegetables,
        sauces: body.sauces,
        fillings: body.fillings
      }).then(result => {
        Order.find({ orderId: body.orderId }).then(result => {
          res.send(result);
        });
      })
    } else {
      res.status(422).send('Error! Params not correct');
    }
  } else {
    res.status(422).send('Error! Incorrect user');
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  // Теперь проверить всё на фронте и проверить через postman delete
  const body = req.query;
  const token = JSON.parse(Buffer.from(req.headers.authorization.split('.')[1], 'base64').toString());
  let selectedOrder = {}

  await Order.find({ orderId: body.orderId }).then(result => {
    if (result) {
      selectedOrder = result[0];
    }
  })
  if (validateUserOrderDeleteChange(token, selectedOrder)) {
    Order.deleteOne({ orderId: req.query.orderId }).then(result =>
      Order.find({ username: req.query.username }).then(result => {
        res.send(result)
      }))
  } else {
    res.status(422).send('Error! Incorrect user');
  }
}

