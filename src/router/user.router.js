import express from "express";
import UserController from "../controllers/user/users.controller.js";
import UserDao from "../dao/factory.user.js";
import passport from "passport";
import { upload } from '../middlewares/Multer.js';
import UserRepositoryIndex from "../repositories/User.repository.js"
import UserModel from "../dao/db/models/userModel.js"


const router = express.Router();


const userController = new UserController(UserDao,UserRepositoryIndex, UserModel, UserController);

router.get("/", userController.getAllUsers.bind(userController));
router.post("/register", userController.createUser.bind(userController)), async (req, res) => {res.redirect("/login")};
router.post("/", passport.authenticate("login", { session: false }), userController.login);
router.get("/:id", userController.getUserById.bind(userController));
router.put("/:id", userController.updateUser.bind(userController));
router.delete("/:id", userController.deleteUser.bind(userController));
router.post("/logout", userController.logout.bind(userController));

router.get("/github", passport.authenticate("github"), userController.github.bind(userController)),
router.get("/githubcallback", passport.authenticate("github"), userController.githubCallback.bind(userController))
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);
router.post("/:id/documents", upload.array('documents'), userController.uploadDocuments.bind(userController));
router.put('/premium/:uid', userController.updateUserRole.bind(userController));
router.get('/:id/documents',userController.getdocument)
router.post("/cleanInactiveUsers/:deadline", userController.findInactiveUsers);
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
