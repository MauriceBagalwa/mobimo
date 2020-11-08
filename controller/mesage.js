const db = require("../models");
module.exports = {
  messages: async (req, res, next) => {
    res.send("Hey mobimo...");
    // db.message
    //   .findAndCountAll({ offset: 5, limit: 5 })
    //   .then((find) => {
    //     res.status(200).json(find);
    //   })
    //   .catch((error) => {
    //     next(error);
    //   });
  },
};
