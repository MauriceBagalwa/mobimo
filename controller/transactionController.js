const db = require("../models");
const request = require("request");
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
          res.status(200).json({
            message: find.codereference,
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
          db.transaction.create(item).then((create) => {
            res.status(200).json({
              message: create.codereference,
            });
          });
        }
      })
      .catch((error) => {
        next(error);
      });
  },
  isUse: async (req, res, next) => {
    const { codereference } = req.body;
    db.transaction
      .findOne({ where: { codereference, etat: false } })
      .then((find) => {
        if (!find)
          res.status(403).json({
            message: "Incorrect or already used code",
          });
        else {
          find.update({ etat: true }).then((update) => {
            res.status(200).json({
              find,
            });
          });
        }
      });
  },
  details: async (req, res, next) => {
    db.transaction.findAll({
      //
      group: ["reseau"],
    });
  },
  sendMssg: async (req, res, next) => {
    const { message, number, from } = req.body;

    const item = {
      username: "danbdana2019",
      psswd: "esm702",
      from:"FREPES",
      to: number,
      message,
      type: 0,
    };
    console.log(item);
    url = `https://www.easysendsms.com/sms/bulksms-api/bulksms-api?username=${item.username}&password=${item.psswd}
      &from=${item.from}&to=${item.to}&text=${item.message}&type=${item.type}`;
    const send = request.get(url, (err, res, body, next) => {
      if (err) {
        console.log(err.message);
      }
    });

    if (send) {
      res.status(200).json({
        number,
      });
    } else {
      res.status(400).json("error ");
    }
  },
};
