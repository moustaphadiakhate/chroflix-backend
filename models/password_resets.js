const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('password_resets', {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'password_resets',
    timestamps: true,
    indexes: [
      {
        name: "password_resets_email_index",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
