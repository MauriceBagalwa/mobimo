const db = require("../models/transaction");
const shortId = require("shortid");
module.exports = {
  transactions: async (req, res, next) => {
    db.findAndCountAll()
      .then((find) => {
        res.Status(200).json({
          find,
        });
      })
      .catch((error) => {
        next(error);
      });
  },
  transaction: async (req, res, next) => {
    db.findOne({ where: { reference: req.body.reference } })
      .find((find) => {
        if (find)
          res.Status(403).json({
            message: "The reference is already in use.",
          });
        else {
          const item = {
            id: shortId.generate(),
            reference: req.body.reference,
            reseau: req.body.reseau,
            numero: req.body.numero,
            montant: req.body.montant,
            devise: req.body.devise,
            solde: req.body.solde,
            message: req.body.message,
          };
          db.create(item).then((create) => {
            res.Status(200).json({
              message: "Transaction save.",
            });
          });
        }
      })
      .catch((error) => {
        next(error);
      });
  },
};
