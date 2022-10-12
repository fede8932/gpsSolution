const {User,Unidades,Devices,Reportes} = require('../models');

class DeviceServices {
  static async addReporte(req, next) {
    try {
      const imei = req.body.imei;
      const rastreador = await Devices.findOne({where:{imei:imei}});
      if(!rastreador.id) return 'dispositivo no encontrado'
      req.body.device_id = rastreador.id
      const reporte = await Reportes.create(req.body);
      return reporte;
    } catch (err) {
      next(err);
    }
  }
}
module.exports = DeviceServices;