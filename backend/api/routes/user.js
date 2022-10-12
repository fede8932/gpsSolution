const userRouter = require("express").Router();
const UserControllers = require('../controllers/UserControllers');
const { isAuth } = require("../middlewares/isAuth");

//Rutas verificadas 3/8/22

//compartidas admin
userRouter.get("/status/:id" , /* isAuth, */ UserControllers.searchReporte); // Estado en tiempo real (uso en admin)
userRouter.get("/zone/:patente", /* isAuth , */ UserControllers.searchZone);   // Buscar zona segura por patente
userRouter.put("/zone/:id", /* isAuth , */ UserControllers.editZone);   // modificar para editar zona segura
userRouter.post("/search/:id/:patente", isAuth, UserControllers.searchReporteByDate);   // Buscar estado por patente

module.exports = userRouter;