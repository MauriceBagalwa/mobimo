const db = require("../models");
const shortId = require("shortid");
module.exports = {
  transactions: async (req, res, next) => {
    db.transaction
      .findAndCountAll()
      .then((find) => {
        res.status(200).json({
          find,
        });
      })
      .catch((error) => {
        next(error);
      });
  },
  transaction: (req, res, next) => {
    db.transaction
      .findOne({ where: { reference: req.body.reference } })
      .then((find) => {
        if (find)
          res.status(403).json({
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
            coderefeence: "234678",
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
