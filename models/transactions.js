const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'transactions',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      numero: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      livre_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      total: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      part_auteur: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      part_chroflix: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'transactions',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );
};
