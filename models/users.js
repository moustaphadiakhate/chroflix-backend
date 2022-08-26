const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'users',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      nom: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      prenom: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pseudo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'users_pseudo_unique',
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      profil: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'users_email_unique',
      },
      email_verified_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      remember_token: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'users_email_unique',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'email' }],
        },
        {
          name: 'users_pseudo_unique',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'pseudo' }],
        },
      ],
    }
  );
};
