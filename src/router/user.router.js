// routers/user.router.js
import express from "express";
import UserController from "../controllers/user/users.controller.js";
import passport from "passport";

const router = express.Router();

const userController = new UserController();

router.post("/register", userController.register);
router.get("/github", passport.authenticate("github")), userController.githubcallback;
router.get("/githubcallback", passport.Authenticator("github"), userController.githubCallback);
router.get("/login", userController.login);
router.get("/logout", userController.logout);


export default router;
