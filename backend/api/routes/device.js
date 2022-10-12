const deviceRouter = require("express").Router();
const DeviceController = require('../controllers/DeviceControllers');

//Rutas verificadas 3/8/22
deviceRouter.post("/", DeviceController.addReporte);


module.exports = deviceRouter;