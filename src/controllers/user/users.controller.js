import passportCall from "../../utils/passportcall.util.js";
import { generateToken } from "../../utils/jwtUtils.js";
import passport from "passport";

class UserController {
  constructor(userDao) {
    this.userDao = userDao;

  }

  async createUser(req, res) {
    const userData = req.body;
    try {
      const newUser = await this.userDao.createUser(userData);
      const token = generateToken(newUser); // Asegúrate de que newUser contenga los datos necesarios
      res.status(201).json({ user: newUser, token }); // Usar res.status().json()
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }

    }

  

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await this.userDao.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }



  async getAllUsers(req, res) {
    const users = await this.userDao.getAllUsers();
    res.json(users);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await this.userDao.updateUser(id, updateData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = await this.userDao.deleteUser(id);
    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }

  async authenticateUser(req, res) {
    passportCall("login")(req, res, async () => {
    const { email, password } = req.body;
    try {
      const { user, token } = await this.userDao.authenticateUser(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ message: "Authentication failed" });
    }
  })
}

async getUserProfile(req, res) {
  try {
    const userId = req.user._id; // Suponiendo que el ID del usuario está en el token JWT
    const userProfile = await this.userDao.getUserById(userId); // Implementa este método en tu servicio

    if (userProfile) {
      res.json(userProfile);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async getAdminProfile(req, res) {
  try {
    const userId = req.user._id; // Suponiendo que el ID del usuario está en el token JWT
    const userProfile = await this.userDao.getUserById(userId); // Implementa este método en tu servicio
    if (userProfile) {
      res.json(userProfile);
    } else {
      res.status(404).json({ message: "User not found" });
    }
    // Aquí implementa la lógica para obtener el perfil del usuario con rol "admin"
    // Puedes utilizar el mismo método que usaste para obtener el perfil en getUserProfile
    // y agregar lógica adicional según sea necesario.

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async login(req, res) {
  try {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!user) {
        return res.status(400).json({
          status: 'failed',
          message: 'Usuario o contraseña incorrectos',
        });
      }

      // Si se autenticó correctamente, genera un token JWT
      const token = generateToken(user);

      // Establece el token en una cookie
      res.cookie('authToken', token, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días de duración
        httpOnly: true,
      });

      // Envía la respuesta al cliente con el token y los datos del usuario
      res.json({
        status: 'success',
        access_token: token,
        user: user,
      });
    })(req, res); // Llamada a la función de autenticación de Passport
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}



async github (req, res) {
  passport.authenticate("github")(req, res, async () => {});}

async githubCallback(req, res) {
  passport.authenticate("github")(req, res, async () => {
    const token = generateToken(req.user);
    res.cookie("authToken", token, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
  }).send({ status: "success", access_token: token, user: req.user });

}

async logout(req, res) {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Error during logout", message: err.message });
    }
    res.clearCookie("authToken");
    res.redirect("/");
  });
}



}


export default UserController;





// import passport from "passport";
// import { generateToken} from "../../utils.js";
// import passportCall from "../../utils/passportcall.util.js";
// import  Router  from "express";
// import e from "express";

// const router= Router();
// //  "/register",["PUBLIC"],passport.authenticate("register"),
// const  register = async (req, res) => {
//   passport.authenticate("register"),(err, user, info) => {
//     if (!req.user)
//       return res.status(400).send({
//         status: "failed",
//         message: "El usuario ya existe",
//       });
//     req.session.user = req.user;
//     const access_token = generateToken(req.user);
//     res.send({ status: "success", access_token, user: req.user });
//   } 
// }

// //ruta para registrarse con github y passport





// //ruta para callback de github

// //ruta para registrarse con passport y jwt


// //ruta para loguearse con passport y jwt
// // users.post( "/login",["PUBLIC"], passport.authenticate("login"), 
// const login = async (req, res) => {
//   passport.authenticate("login"),(err, user, info) => {;
//   console.log("Usuario autenticado:", req.user);
//   if (!req.user) {
//     console.log(req.user);
//     return res.status(400).send({
//       status: "failed",
//       message: "Usuario o contraseña incorrectos",
//     });
//   }
// }
 
//   const token = generateToken(req.user);
//   return res.cookie("authToken", token, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
//             .send({ status: "success", access_token: token, user: req.user });
// }




// //ruta para cerrar sesion
// // users.get("/logout",["PUBLIC"], 
// const logout = async(req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return res.status(500).json({ error: "Error during logout", message: err.message });
//     }
//     res.clearCookie("authToken");
//     res.redirect("/");
    
//   });
// }

// export default {
//   register,
//   githubcallback,
//   githubCallback,
//   login,
//   logout
// }

