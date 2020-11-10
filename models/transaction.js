/* jshint indent: 2 */
const request = require("request");
module.exports = function (sequelize, DataTypes) {
  const Transaction = sequelize.define(
    "transaction",

    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      reference: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      reseau: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      numero: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      montant: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      devise: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      solde: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dateReception: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      codereference: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      etat: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      deliverycode: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "transaction",
      timestamps: false,
      hooks: {
        beforeValidate: function (trans) {
          var result = "";
          var characters =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          var charactersLength = characters.length;
          for (var i = 0; i < 6; i++) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          }
          trans.codereference = result;
        },
        afterCreate: function (trans) {
          const item = {
            username: "uptoupto2020",
            psswd: "esm18627",
            from: "UpToDate",
            to: trans.numero,
            message: `Paiement effectuer, le code correspondant ${String.fromCharCode(224)} votre agent est: ${trans.codereference}`,
            type: 0,
          };
          console.log(item);
          url = `https://www.easysendsms.com/sms/bulksms-api/bulksms-api?username=${item.username}&password=${item.psswd}
            &from=${item.from}&to=${item.to}&text=${item.message}&type=${item.type}`;
          request.get(url, (err, res, body, next) => {
            if (!err) {
              trans
                .update({ deliverycode: true })
                .then((update) => {
                  console.log(`change delivery for ${trans.reference}`);
                })
                .catch((err) => {
                  console.log(error);
                  next(error);
                });
            }
          });
        },
      },
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  return Transaction;
};
