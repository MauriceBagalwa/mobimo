/* jshint indent: 2 */

const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define(
    "message",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      numero: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      reseau: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      dateReception: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "message",
      timestamps: false,
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
  return Message;
};
