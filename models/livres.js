const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'livres',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      auteur_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      genre_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      titre: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prix: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      taro: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      age: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      banaliser: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'livres',
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
