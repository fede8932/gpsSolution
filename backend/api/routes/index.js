const router = require("express").Router()
const authRoute = require("./auth")
const adminRoute = require("./admin")
const userRoute = require("./user")
const deviceRoute = require("./device")

router.use("/auth", authRoute)
router.use("/admin", adminRoute)
router.use("/user", userRoute)
router.use("/reporte", deviceRoute)

module.exports = router