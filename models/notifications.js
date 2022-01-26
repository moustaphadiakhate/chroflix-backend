const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notifications', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    titre: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    consulted: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    notif_for_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "#"
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notifications',
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
