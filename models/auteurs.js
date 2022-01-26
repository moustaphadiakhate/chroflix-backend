const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auteurs', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pseudo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    approuver: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    certifier: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    banaliser: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'auteurs',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
