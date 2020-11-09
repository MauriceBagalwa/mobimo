/* jshint indent: 2 */
const Sequelize = require("sequelize");
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
