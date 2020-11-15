const db = require("../models");
const shortId = require("shortid");
const request = require("request");
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
          db.transaction
            .create(item)
            .then((create) => {
              const item = {
                username: "danbdana2019",
                psswd: "esm702",
                from: "UpDev",
                to: trans.numero,
                message: `Paiement effectue, avec succes le code correspondant ${String.fromCharCode(
                  224
                )} votre argent est: ${create.codereference}`,
                type: 0,
              };

              var url = `https://www.easysendsms.com/sms/bulksms-api/bulksms-api?username=${item.username}&password=${item.psswd}
              &from=${item.from}&to=${item.to}&text=${item.message}&type=${item.type}`;
              request.get(url, (err, res, body, next) => {
                if (!err) {
                  create
                    .update({ deliverycode: true })
                    .then((delivery) => {
                      res
                        .status(200)
                        .json(`le code est ${create.codereference}`);
                    })
                    .catch((error) => {
                      console.log(error);
                      next(error);
                    });
             
                }
              });
            })
            .catch((error) => {
              next(error);
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
};
