'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});

  user.associate = function (models) {
    this.belongsTo(models.group, { foreignKey: 'teamSpecifier' });
  };
  return user;
};