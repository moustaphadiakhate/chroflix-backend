const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    commenter_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    commenter_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    guest_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    guest_email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    commentable_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    commentable_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    },
    child_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'comments',
    timestamps: true,
    paranoid: true,
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
        name: "comments_commenter_id_commenter_type_index",
        using: "BTREE",
        fields: [
          { name: "commenter_id" },
          { name: "commenter_type" },
        ]
      },
      {
        name: "comments_commentable_type_commentable_id_index",
        using: "BTREE",
        fields: [
          { name: "commentable_type" },
          { name: "commentable_id" },
        ]
      },
      {
        name: "comments_child_id_foreign",
        using: "BTREE",
        fields: [
          { name: "child_id" },
        ]
      },
    ]
  });
};
