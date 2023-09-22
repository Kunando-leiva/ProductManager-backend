import passportCall from "../../utils/passportcall.util.js";
import { generateToken } from "../../utils/jwtUtils.js";
import passport from "passport";
import { v4 as uuidv4 } from 'uuid';
import { createTransport } from "nodemailer";
import { createHash } from "../../utils/Hash.js";
import bcrypt from "bcrypt"


const TEST_MAIL = "aprendisdecoder@gmail.com";
const PASS = "jzfiofblqkoinpie"



class UserController {
  constructor(UserRepositoryIndex) {
    this.UserRepositoryIndex = UserRepositoryIndex;

  }

  async createUser(req, res) {
    const userData = req.body;
    try {
      const newUser = await this.UserRepositoryIndex.createUser(userData);
      const token = generateToken(newUser); // Asegúrate de que newUser contenga los datos necesarios
      res.status(201).json({ user: newUser, token }); 
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }

    }

  

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await this.UserRepositoryIndex.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }



  async getAllUsers(req, res) {
    const users = await this.UserRepositoryIndex.getAllUsers();
    res.json(users);
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await this.UserRepositoryIndex.updateUser(id, updateData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const deletedUser = await this.UserRepositoryIndex.deleteUser(id);
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
      const { user, token } = await this.UserRepositoryIndex.authenticateUser(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ message: "Authentication failed" });
    }
  })
}

async getUserProfile(req, res) {
  try {
    const userId = req.user._id; // Suponiendo que el ID del usuario está en el token JWT
    const userProfile = await this.UserRepositoryIndex.getUserById(userId); // Implementa este método en tu servicio

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
    const userProfile = await this.UserRepositoryIndex.getUserById(userId); // Implementa este método en tu servicio
    if (userProfile) {
      res.json(userProfile);
    } else {
      res.status(404).json({ message: "User not found" });
    }

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

 forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    
    console.log("this.UserRepositoryIndex:", this.UserRepositoryIndex); // Asegúrate de que UserRepositoryIndex esté disponible


    const user = await this.UserRepositoryIndex.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Generar un token único para restablecer la contraseña
    const token = uuidv4().toString();
    user.resetPasswordToken = token.toString();
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // Enviar correo electrónico con el enlace de restablecimiento
    const resetLink = `http://tu-sitio-web/reset-password/${token}`;
    const emailContent = {
      from: TEST_MAIL,
      to: user.email,
      subject: 'Recuperación de contraseña',
      html: `<p>Hola ${user.first_name},</p><p>Puedes restablecer tu contraseña <a href="${resetLink}">aquí</a>.</p>`,
    };

    // Utiliza el transporter para enviar el correo electrónico
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: TEST_MAIL,
        pass: PASS,
      },
    });

    const info = await transporter.sendMail(emailContent);
    console.log(info);

    res.json({ message: 'Se ha enviado un correo con instrucciones para restablecer la contraseña.', token });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: 'Error al enviar el correo de recuperación de contraseña.' });
  }
}

 resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const currentDate = Date.now();

    const user = await this.UserRepositoryIndex.findOneByResetTokenAndExpiration(token, currentDate);

    if (!user) {
      return res.status(400).json({ message: 'El enlace ha caducado o no es válido.' });
    }

 

    
    // Actualizar la contraseña del usuario y limpiar los campos de restablecimiento
    user.password = createHash(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Contraseña restablecida con éxito.' });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: 'Error al restablecer la contraseña.' });
  }
}

updateUserRole = async (req, res) => {
  const userId = req.params.uid; // ID del usuario a actualizar
  const newRole = req.body.newRole; // Nuevo rol ("user" o "premium")

  try {
    const user = await this.UserRepositoryIndex.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.role = newRole;
    await user.save();

    return res.status(200).json({ message: `Rol de usuario actualizado a ${newRole}` });
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error); // Agrega esta línea para registrar el error en la consola
    return res.status(500).json({ message: 'Error al actualizar el rol del usuario' });
  }
};



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

