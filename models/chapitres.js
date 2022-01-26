const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chapitres', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    livre_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    titre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contenu: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    banaliser: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'chapitres',
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
