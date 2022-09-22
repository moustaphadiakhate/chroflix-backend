const { DataTypes } = require('sequelize');
const _abonnements = require('./abonnements');
const _auteurs = require('./auteurs');
const _bibliotheques = require('./bibliotheques');
const _brouillons = require('./brouillons');
const _chapitres = require('./chapitres');
const _comments = require('./comments');
const _data_rows = require('./data_rows');
const _data_types = require('./data_types');
const _dernierelectures = require('./dernierelectures');
const _failed_jobs = require('./failed_jobs');
const _genres = require('./genres');
const _livres = require('./livres');
const _menu_items = require('./menu_items');
const _menus = require('./menus');
const _messagerie = require('./messagerie');
const _migrations = require('./migrations');
const _model_has_permissions = require('./model_has_permissions');
const _model_has_roles = require('./model_has_roles');
const _notifications = require('./notifications');
const _password_resets = require('./password_resets');
const _permissions = require('./permissions');
const _pwa_settings = require('./pwa_settings');
const _role_has_permissions = require('./role_has_permissions');
const _roles = require('./roles');
const _transactions = require('./transactions');
const _users = require('./users');
const _votes = require('./votes');
const _wishlists = require('./wishlists');


function initModels(sequelize) {
  const abonnements = _abonnements(sequelize, DataTypes);
  const auteurs = _auteurs(sequelize, DataTypes);
  const bibliotheques = _bibliotheques(sequelize, DataTypes);
  const brouillons = _brouillons(sequelize, DataTypes);
  const chapitres = _chapitres(sequelize, DataTypes);
  const comments = _comments(sequelize, DataTypes);
  const data_rows = _data_rows(sequelize, DataTypes);
  const data_types = _data_types(sequelize, DataTypes);
  const dernierelectures = _dernierelectures(sequelize, DataTypes);
  const failed_jobs = _failed_jobs(sequelize, DataTypes);
  const genres = _genres(sequelize, DataTypes);
  const livres = _livres(sequelize, DataTypes);
  const menu_items = _menu_items(sequelize, DataTypes);
  const menus = _menus(sequelize, DataTypes);
  const messagerie = _messagerie(sequelize, DataTypes);
  const migrations = _migrations(sequelize, DataTypes);
  const model_has_permissions = _model_has_permissions(sequelize, DataTypes);
  const model_has_roles = _model_has_roles(sequelize, DataTypes);
  const notifications = _notifications(sequelize, DataTypes);
  const password_resets = _password_resets(sequelize, DataTypes);
  const permissions = _permissions(sequelize, DataTypes);
  const pwa_settings = _pwa_settings(sequelize, DataTypes);
  const role_has_permissions = _role_has_permissions(sequelize, DataTypes);
  const roles = _roles(sequelize, DataTypes);
  const transactions = _transactions(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);
  const votes = _votes(sequelize, DataTypes);
  const wishlists = _wishlists(sequelize, DataTypes);
  

  permissions.belongsToMany(roles, {
    as: 'role_id_roles',
    through: role_has_permissions,
    foreignKey: 'permission_id',
    otherKey: 'role_id',
  });
  roles.belongsToMany(permissions, {
    as: 'permission_id_permissions',
    through: role_has_permissions,
    foreignKey: 'role_id',
    otherKey: 'permission_id',
  });
  comments.belongsTo(comments, { as: 'child', foreignKey: 'child_id' });
  comments.hasMany(comments, { as: 'comments', foreignKey: 'child_id' });
  data_rows.belongsTo(data_types, { as: 'data_type', foreignKey: 'data_type_id' });
  data_types.hasMany(data_rows, { as: 'data_rows', foreignKey: 'data_type_id' });
  menu_items.belongsTo(menus, { as: 'menu', foreignKey: 'menu_id' });
  menus.hasMany(menu_items, { as: 'menu_items', foreignKey: 'menu_id' });
  model_has_permissions.belongsTo(permissions, { as: 'permission', foreignKey: 'permission_id' });
  permissions.hasMany(model_has_permissions, {
    as: 'model_has_permissions',
    foreignKey: 'permission_id',
  });
  role_has_permissions.belongsTo(permissions, { as: 'permission', foreignKey: 'permission_id' });
  permissions.hasMany(role_has_permissions, {
    as: 'role_has_permissions',
    foreignKey: 'permission_id',
  });
  model_has_roles.belongsTo(roles, { as: 'role', foreignKey: 'role_id' });
  roles.hasMany(model_has_roles, { as: 'model_has_roles', foreignKey: 'role_id' });
  role_has_permissions.belongsTo(roles, { as: 'role', foreignKey: 'role_id' });
  roles.hasMany(role_has_permissions, { as: 'role_has_permissions', foreignKey: 'role_id' });

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
