const db = require("../models");
const shortId = require("shortid");
module.exports = {
  messages: async (req, res, next) => {
    db.message
      .findAndCountAll({ offset: 5, limit: 5 })
      .then((find) => {
        res.status(200).json(find);
      })
      .catch((error) => {
        next(error);
      });
  },
  message: async (req, res, next) => {
    const item = {
      id: shortId.generate(),
      numero: req.body.numero,
      reseau: req.body.reseau,
      message: req.body.message,
    };
    db.message
      .create(item)
      .then((create) => {
        res.status(200).json(create);
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
};
