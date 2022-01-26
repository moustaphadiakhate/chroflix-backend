const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('data_types', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "data_types_name_unique"
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "data_types_slug_unique"
    },
    display_name_singular: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    display_name_plural: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    model_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    generate_permissions: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'data_types',
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
      {
        name: "data_types_name_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "data_types_slug_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slug" },
        ]
      },
    ]
  });
};
