const AdminServices = require('../services/AdminServices');

class AdminController {
  static async addVehiculo(req, res, next) {
    const {error , respuesta} = await AdminServices.serviceAddVehicle(req, next);
    return !error ? res.status(200).json(respuesta) : res.status(500).send(respuesta);
  }
  static async clientSearch(req, res, next) {
    const {error,respuesta} = await AdminServices.clientSearch(req, next);
    return !error ? res.status(200).json(respuesta) : res.sendStatus(500).send(respuesta);
  }
  static async vehicleSearchDom(req, res, next) {
    const {error , data} = await AdminServices.vehicleSearchDom(req, next);
    return !error ? res.status(200).json(data) : res.sendStatus(500);
  }
  static async clientModify(req, res, next) {
    const {error,response} = await AdminServices.clientModify(req, next);
    return !error ? res.status(200).json(response) : res.status(500).json(response);
  }
  static async vehicleModify(req, res, next) {
    const vehiculo = await AdminServices.vehicleModify(req, next);
    return vehiculo ? res.status(200).json(vehiculo) : res.sendStatus(500);
  }
  static async addDevice(req, res, next) {
    const device = await AdminServices.addDevice(req, next);
    return device ? res.status(200).json(device) : res.sendStatus(500);
  }
  static async availableDevice(req, res, next) {
    const devices = await AdminServices.availableDevice(req, next);
    return devices ? res.status(200).json(devices) : res.sendStatus(500);
  }
}
module.exports = AdminController;
