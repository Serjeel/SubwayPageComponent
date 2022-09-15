const Food = require("./foodModel");

module.exports.getAllFood = async (req, res, next) => {
    Food.find().then(result => {
        res.send(result);
      });
};