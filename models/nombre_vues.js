const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'nombre_vues',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      livre_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    count: {
      type: INTEGER,
      allowNull: false,
    }
    },
    {
      sequelize,
      tableName: 'nombre_vues',
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
