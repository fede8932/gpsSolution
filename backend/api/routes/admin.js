const adminRouter = require("express").Router();
const AdminController = require('../controllers/AdminControllers');
const { isAuth , isAdmin } = require('../middlewares/isAuth')

//Rutas verificadas 3/8/22
adminRouter.post("/add/vehiculo", isAuth, isAdmin, AdminController.addVehiculo); //agregar vehiculo
adminRouter.post("/add/device", isAuth, isAdmin, AdminController.addDevice); //agregar dispositivo
adminRouter.post("/client", isAuth, isAdmin, AdminController.clientSearch); //Busca cliente por nombre/mail/cuit
adminRouter.post("/vehicle/dom", isAuth, isAdmin, AdminController.vehicleSearchDom); //consultar vehiculo por patente
adminRouter.get("/devices/true/", isAuth, isAdmin, AdminController.availableDevice);    //consultar dispositivos disponibles
adminRouter.patch("/client/:id", isAuth, isAdmin, AdminController.clientModify); // modificar usuario por ID
adminRouter.put("/vehicle/:id", isAuth, isAdmin, AdminController.vehicleModify); // Modifica vehiculo por ID

module.exports = adminRouter;