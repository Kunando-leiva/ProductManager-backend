import passport from "passport";
import { generateToken } from "../../utils.js";
import passportCall from "../../utils/passportcall.util.js";

class UserServices {
 
async register(req, res) {
  if (!req.user)
    return res.status(400).send({
      status: "failed",
      message: "El usuario ya existe",
    });
  req.session.user = req.user;
  const access_token = generateToken(req.user);
  res.send({ status: "success", access_token, user: req.user });

}


async githubCallback(req, res) {
    const token = generateToken(req.user);
    res.cookie("authToken", token, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
    
    res.redirect("/menu");
}

async login(req, res) {
  console.log("Usuario autenticado:", req.user);
  if (!req.user) {
    console.log(req.user);
    return res.status(400).send({
      status: "failed",
      message: "Usuario o contraseña incorrectos",
    });
  }
  const access_token = generateToken(req.user);
  res.send({ status: "success", access_token, user: req.user });


}

async logout(req, res) {
    req.logout();
    res.redirect("/login");
}





}

export default UserServices;