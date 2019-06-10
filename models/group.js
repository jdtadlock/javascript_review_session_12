'use strict';
module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('group', {
    name: DataTypes.STRING
  }, {});
  group.associate = function (models) {
    this.hasMany(models.user, { foreignKey: 'teamSpecifier' });
  };
  return group;
};