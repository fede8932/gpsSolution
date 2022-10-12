const User = require("./User");
const Unidades = require("./Unidades");
const Reportes = require("./Reportes");
const Devices = require("./Devices");
const ZonaSegura = require("./ZonaSegura");

User.hasMany(Unidades, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Unidades.belongsTo(User,{
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Devices.hasOne(Unidades, {
  foreignKey: 'device_id',
  onDelete: 'CASCADE',
});
Unidades.belongsTo(Devices,{
  foreignKey: 'device_id',
  onDelete: 'CASCADE',
});

Devices.hasMany(Reportes, {
  foreignKey: 'device_id',
  onDelete: 'CASCADE',
});
Reportes.belongsTo(Devices,{
  foreignKey: 'device_id',
  onDelete: 'CASCADE',
});

ZonaSegura.belongsTo(Unidades,{
  foreignKey: 'unidad_id',
  onDelete: 'CASCADE',
});
Unidades.hasOne(ZonaSegura,{
  foreignKey: 'unidad_id',
  onDelete: 'CASCADE',
});

module.exports = {
  User,
  Unidades,
  Reportes,
  Devices,
  ZonaSegura
};