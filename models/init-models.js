var DataTypes = require("sequelize").DataTypes;
var _abonnements = require("./abonnements");
var _auteurs = require("./auteurs");
var _bibliotheques = require("./bibliotheques");
var _brouillons = require("./brouillons");
var _chapitres = require("./chapitres");
var _comments = require("./comments");
var _data_rows = require("./data_rows");
var _data_types = require("./data_types");
var _dernierelectures = require("./dernierelectures");
var _failed_jobs = require("./failed_jobs");
var _genres = require("./genres");
var _livres = require("./livres");
var _menu_items = require("./menu_items");
var _menus = require("./menus");
var _messagerie = require("./messagerie");
var _migrations = require("./migrations");
var _model_has_permissions = require("./model_has_permissions");
var _model_has_roles = require("./model_has_roles");
var _notifications = require("./notifications");
var _password_resets = require("./password_resets");
var _permissions = require("./permissions");
var _pwa_settings = require("./pwa_settings");
var _role_has_permissions = require("./role_has_permissions");
var _roles = require("./roles");
var _transactions = require("./transactions");
var _users = require("./users");
var _votes = require("./votes");
var _wishlists = require("./wishlists");

function initModels(sequelize) {
  var abonnements = _abonnements(sequelize, DataTypes);
  var auteurs = _auteurs(sequelize, DataTypes);
  var bibliotheques = _bibliotheques(sequelize, DataTypes);
  var brouillons = _brouillons(sequelize, DataTypes);
  var chapitres = _chapitres(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var data_rows = _data_rows(sequelize, DataTypes);
  var data_types = _data_types(sequelize, DataTypes);
  var dernierelectures = _dernierelectures(sequelize, DataTypes);
  var failed_jobs = _failed_jobs(sequelize, DataTypes);
  var genres = _genres(sequelize, DataTypes);
  var livres = _livres(sequelize, DataTypes);
  var menu_items = _menu_items(sequelize, DataTypes);
  var menus = _menus(sequelize, DataTypes);
  var messagerie = _messagerie(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var model_has_permissions = _model_has_permissions(sequelize, DataTypes);
  var model_has_roles = _model_has_roles(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var password_resets = _password_resets(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var pwa_settings = _pwa_settings(sequelize, DataTypes);
  var role_has_permissions = _role_has_permissions(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var votes = _votes(sequelize, DataTypes);
  var wishlists = _wishlists(sequelize, DataTypes);

  permissions.belongsToMany(roles, { as: 'role_id_roles', through: role_has_permissions, foreignKey: "permission_id", otherKey: "role_id" });
  roles.belongsToMany(permissions, { as: 'permission_id_permissions', through: role_has_permissions, foreignKey: "role_id", otherKey: "permission_id" });
  comments.belongsTo(comments, { as: "child", foreignKey: "child_id"});
  comments.hasMany(comments, { as: "comments", foreignKey: "child_id"});
  data_rows.belongsTo(data_types, { as: "data_type", foreignKey: "data_type_id"});
  data_types.hasMany(data_rows, { as: "data_rows", foreignKey: "data_type_id"});
  menu_items.belongsTo(menus, { as: "menu", foreignKey: "menu_id"});
  menus.hasMany(menu_items, { as: "menu_items", foreignKey: "menu_id"});
  model_has_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
  permissions.hasMany(model_has_permissions, { as: "model_has_permissions", foreignKey: "permission_id"});
  role_has_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
  permissions.hasMany(role_has_permissions, { as: "role_has_permissions", foreignKey: "permission_id"});
  model_has_roles.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(model_has_roles, { as: "model_has_roles", foreignKey: "role_id"});
  role_has_permissions.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(role_has_permissions, { as: "role_has_permissions", foreignKey: "role_id"});

  return {
    abonnements,
    auteurs,
    bibliotheques,
    brouillons,
    chapitres,
    comments,
    data_rows,
    data_types,
    dernierelectures,
    failed_jobs,
    genres,
    livres,
    menu_items,
    menus,
    messagerie,
    migrations,
    model_has_permissions,
    model_has_roles,
    notifications,
    password_resets,
    permissions,
    pwa_settings,
    role_has_permissions,
    roles,
    transactions,
    users,
    votes,
    wishlists,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
