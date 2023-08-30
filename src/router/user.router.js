import express from "express";
import UserController from "../controllers/user/users.controller.js";
import UserDao from "../dao/db/manager/users.dao.js";
import UserService from "../services/users.services.js";
import passportCall from "../utils/passportcall.util.js";
import authorization from "../middlewares/auth.middleware.js";
import passport from "passport";


const router = express.Router();
const userDao = new UserDao();
const userService = new UserService(userDao);
const userController = new UserController(userService);

router.post("/register", userController.createUser.bind(userController)), async (req, res) => {res.redirect("/login")}
router.post("/", passport.authenticate("login", { session: false }), userController.login);
router.get("/:id", userController.getUserById.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));
router.post("/authenticate", userController.authenticateUser.bind(userController));
router.get("/profile", passportCall("jwt"), userController.getUserProfile.bind(userController));
router.get("/admin-profile",passportCall("jwt"),authorization("admin"),userController.getAdminProfile.bind(userController));

router.get("/github", passport.authenticate("github"), userController.github.bind(userController)),
router.get("/githubcallback", passport.authenticate("github"), userController.githubCallback.bind(userController))
// Agrega más rutas según tus necesidades

export default router;








// // routers/user.router.js
// import express from "express";
// import UserController from "../controllers/user/users.controller.js";
// import passport from "passport";
// import passportCall from "../utils/passportcall.util.js";


// const router = express.Router();

// router.post("/register",["PUBLIC"], UserController.register);

// router.get("/login",["PUBLIC"], UserController.login);
// router.get("/logout", UserController.logout);


// export default router;
