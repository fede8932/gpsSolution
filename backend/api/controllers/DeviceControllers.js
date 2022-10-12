const DeviceServices = require('../services/DeviceServices');

class DeviceController {
  static async addReporte(req, res, next) {
    
    const reporte = await DeviceServices.addReporte(req, next);
    return reporte ? res.status(200).json(reporte) : res.sendStatus(500);
  }
}
module.exports = DeviceController;