import { Router } from "express";
import passport from "passport";
import userManager from "../dao/db/manager/user.js";


const router = Router();

router.get("/github", passport.authenticate("github"), async (req, res) => {});

router.get(
  "/githubcallback",
  passport.authenticate("github"),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/menu");
  }
);

router.post(
    "/register",
    passport.authenticate("register", { failureRedirect: "/failureRedirect" }),
    async (req, res) => {
      res.send({ status: "success", message: "Usuario creado" });
   
    }
);
  
router.post(
    "/login",
    passport.authenticate("login", { failureRedirect: "/failureRedirect" }),
    async (req, res) => {
      if (!req.user)
        return res.status(400).send({
          status: "failed",
          message: "Usuario o contraseña incorrectos",
        });
      req.session.user = req.user;
      res.send({ status: "success", payload: req.user });
    }
);
  

export default router;