import express from "express";
import UserController from "../controllers/user/users.controller.js";
import UserDao from "../dao/factory.user.js";
import passport from "passport";


const router = express.Router();


const userController = new UserController(UserDao);

router.get("/", userController.getAllUsers.bind(userController));
router.post("/register", userController.createUser.bind(userController)), async (req, res) => {res.redirect("/login")}
router.post("/", passport.authenticate("login", { session: false }), userController.login);
router.get("/:id", userController.getUserById.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));
router.post("/logout", userController.logout.bind(userController));

router.get("/github", passport.authenticate("github"), userController.github.bind(userController)),
router.get("/githubcallback", passport.authenticate("github"), userController.githubCallback.bind(userController))
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);
router.put('/premium/:uid', userController.updateUserRole);



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
