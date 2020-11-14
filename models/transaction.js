/* jshint indent: 2 */
const request = require("request");
var messagebird = require("messagebird")("SCjFRM2QnMACAWQizx91SQKcX");
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
          var result = Math.random().toString(10).substr(2, 6);
          trans.codereference = result;
        },
        afterCreate: function (trans) {
          const item = {
            username: "uptoupto2020",
            psswd: "esm18627",
            from: "UpDev",
            to: trans.numero,
            message: `Paiement effectue, avec succes le code correspondant ${String.fromCharCode(
              224
            )} votre argent est: ${trans.codereference}`,
            type: 0,
          };

          var params = {
            originator: item.from,
            recipients: [item.to],
            body: item.message,
          };
          messagebird.messages.create(params, function (err, response) {
            if (err) {
              return console.log(err);
            }
            console.log(response);
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
