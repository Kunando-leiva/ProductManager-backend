import passport from "passport";
import { generateToken, verifyToken} from "../../utils.js";
import passportCall from "../../utils/passportcall.util.js";
import  Router  from "express";

const router = Router();





class UserController{
  constructor() {
    this.router = router;
    this.initializeRoutes();

  }


  initializeRoutes() {

this.post(
  "/register",["PUBLIC"],
  passport.authenticate("register"),
  async (req, res) => {
    if (!req.user)
      return res.status(400).send({
        status: "failed",
        message: "El usuario ya existe",
      });
    req.session.user = req.user;
    const access_token = generateToken(req.user);
    res.send({ status: "success", access_token, user: req.user });
  }  
);

//ruta para registrarse con github y passport

this.get("/github", passportCall("github"), async (req, res) => {});

//ruta para callback de github
this.get("/githubcallback",passportCall("github"),
  async (req, res) => {
   const token = generateToken(req.user);
    res.cookie("authToken", token, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})

    res.redirect("/menu");
  }
);

//ruta para registrarse con passport y jwt


//ruta para loguearse con passport y jwt
this.post( "/login",["PUBLIC"], passport.authenticate("login"), async (req, res) => {
  console.log("Usuario autenticado:", req.user);
  if (!req.user) {
    console.log(req.user);
    return res.status(400).send({
      status: "failed",
      message: "Usuario o contraseña incorrectos",
    });
  }
 
  const token = generateToken(req.user);
  return res.cookie("authToken", token, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
            .send({ status: "success", access_token: token, user: req.user });
});



//ruta para cerrar sesion
this.get("/logout",["PUBLIC"], (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error during logout", message: err.message });
    }
    res.clearCookie("authToken");
    res.redirect("/");
    
  });
});


  }

}

export default UserController;