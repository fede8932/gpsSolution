const UserServices = require('../services/UserServices');

class UserControllers {
  static async searchReporte(req, res, next) {
    const reporte = await UserServices.searchReporte(req, next);
    return reporte ? res.status(200).json(reporte) : res.sendStatus(500);
  }
  static async searchZone(req, res, next) {
    const zona = await UserServices.searchZone(req, next);
    return zona ? res.status(200).json(zona) : res.sendStatus(500);
  }
  static async editZone(req, res, next) {
    const zona = await UserServices.editZone(req, next);
    return zona ? res.status(200).json(zona) : res.sendStatus(500);
  }
  static async searchReporteByDate(req, res, next) {
    const reporte = await UserServices.searchReporteByDate(req, next);
    return reporte ? res.status(200).json(reporte) : res.sendStatus(500);
  }
}
module.exports = UserControllers;