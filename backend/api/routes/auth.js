const router = require("express").Router();
const UserController = require("../controllers/Auth");
const { isAuth, isAdmin } = require('../middlewares/isAuth');

router.post("/login", UserController.login);
router.post("/register", /* isAuth, isAdmin, */ UserController.register);
router.post("/me", isAuth, UserController.me);

// router.put("/forgotPasswordSecurity", UserController.forgotPasswordSecurity);
// router.put("/forgotPasswordAdmin", UserController.forgotPasswordAdmin);
// router.put("/newAdminPassword/:token", UserController.updateAdminPassword);
// router.put("/newSecurityPassword/:token",UserController.updateSecurityPassword);

module.exports = router;
