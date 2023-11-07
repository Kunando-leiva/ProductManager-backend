import passportCall from "../../utils/passportcall.util.js";
import { generateToken } from "../../utils/jwtUtils.js";
import passport from "passport";
import { v4 as uuidv4 } from 'uuid';
import { createTransport } from "nodemailer";
import { createHash } from "../../utils/Hash.js";
import UserModel from "../../dao/db/models/userModel.js";
import {cartRepositoryIndex} from "../../repositories/index.repositorie.js"
import {UserRepositoryIndex} from "../../repositories/index.repositorie.js"

const TEST_MAIL = "aprendisdecoder@gmail.com";
const PASS = "jzfiofblqkoinpie"
import moment from "moment-timezone";

moment.tz.setDefault('America/Argentina'); 

const currentDate = moment().toDate();


class UserController {
  constructor(UserRepository) {
    this.userRepositoryIndex = UserRepositoryIndex;
    this.cartRepositoryIndex = cartRepositoryIndex;
    this.userModel = UserModel
    this.UserRepository = UserRepository
  }

  async createUser(req, res) {
    const userData = req.body;
    

    if (!userData.email) {
        return res.status(400).json({ error: 'Correo electrónico es un campo requerido' });
    }

    try {
        const existingUser = await this.userRepositoryIndex.findUserByEmail(userData.email);

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const cart = await this.cartRepositoryIndex.createCart();

        userData.cart = cart._id;

        const newUser = await this.userRepositoryIndex.createUser(userData);
        const token = generateToken(newUser);
        res.status(201).json({ user: newUser, token, cartId: cart._id });
    } catch (error) {
        console.log("Error en createUser:", error);
        res.status(500).json({ error: "Error creating user" });
    }
}
  

  

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await this.userRepositoryIndex.getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }



  async getAllUsers(req, res) {
    try {
      const users = await this.userRepositoryIndex.getAllUsers();
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener usuarios" });
    }
  }
  
  
  

  async updateUser(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await this.userRepositoryIndex.updateUser(id, updateData);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }


  async deleteUser(req, res) {
    const { id } = req.params;

    try {
        console.log("Buscando usuario con _id:", id); // Agrega registro de depuración
        const user = await this.userRepositoryIndex.getUserById(id);

        if (!user) {
            console.log("Usuario no encontrado"); // Agrega registro de depuración
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const deletedUser = await this.userRepositoryIndex.deleteUser(id);

        if (deletedUser) {
            console.log("Usuario eliminado con éxito"); 
            return res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } else {
          console.log("Usuario eliminado con éxito");  
          return res.status(200).json({ message: 'Usuario eliminado con éxito' });
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res.status(500).json({ error: `Error al eliminarrr el usuario: ${error.message}` });
    }
}

  
  
  
  
  
  
  



  async authenticateUser(req, res) {
    passportCall("login")(req, res, async () => {
    const { email, password } = req.body;
    try {
      const { user, token } = await this.userRepositoryIndex.authenticateUser(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ message: "Authentication failed" });
    }
  })
}


async login(req, res) {
  try {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        return res.status(500).json({ status: "failed", message: err.message });
      }

      if (!user) {
        console.log("loginuser",user)
        return res.status(400).json({
          status: "failed",
          message: "Usuario o contraseña incorrectos",
        });
      }

      req.logIn(user, async (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ status: "failed", message: loginErr.message });
        }

        const token = generateToken(user);

        res.cookie("authToken", token, {
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días de duración
          httpOnly: true,
        });

        res.status(200).json({
          status: "success",
          access_token: token,
          user: user,
        });
      });
    })(req, res);
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
    console.log(error);
  }
}

async uploadDocuments(req, res) {
  try {
    const userId = req.params.id;
    const { fileType } = req.body;

    const uploadedDocuments = req.body.files; // Cambiar req.files a req.body.files

    // Realiza acciones necesarias con los documentos, por ejemplo, actualiza el estado del usuario en la base de datos
    const user = await this.userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Recorre los documentos subidos y agrégalos al campo "documents" del usuario
    uploadedDocuments.forEach((document) => {
      user.documents.push({
        name: document.name,
        reference: document.reference
      });
    });
    
    // Actualiza el estado del usuario según tus necesidades
    user.status = 'Documento cargado';
    
    // Guarda los cambios en la base de datos, incluyendo los documentos
    await user.save();

    res.status(200).json({ message: 'Documentos subidos exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error durante la carga de documentos', message: error.message });
  }
}


async getdocument(req, res){
  try {
    const userId = req.params.id;

    // Consulta el usuario por su ID y obtén los detalles de los documentos
    const user = await UserModel
      .findById(userId)
      .select('documents'); // Incluye solo los detalles de los documentos

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Responde con los detalles de los documentos
    res.status(200).json({ documents: user.documents });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los documentos', message: error.message });
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
} catch (error) {
res.status(500).json({ status: 'failed', message: error.message });
console.log(error);
}

 forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    
    console.log("this.UserRepositoryIndex:", this.UserRepository); 


    const user = await this.UserRepository.findUserByEmail(email);

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
    console.log("forgotPassword",info);

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

    const user = await this.UserRepository.findOneByResetTokenAndExpiration(token, currentDate);

    if (!user) {
      return res.status(400).json({ message: 'El enlace ha caducado o no es válido.' });
    }

 

    
   
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


async updateUserRole(req, res) {
  try {
    const { uid } = req.params;
    const user = await this.userRepositoryIndex.getUserById(uid);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const newRole = req.body.newRole;

    if (user.role === 'user' && newRole === 'premium') {
      const hasRequiredDocuments = user.documents.some((document) => {
        return document.name === 'Identificación' || document.name === 'Comprobante de domicilio' || document.name === 'Comprobante de estado de cuenta';
      });

      if (!hasRequiredDocuments) {
        return res.status(400).json({ message: 'El usuario no ha cargado los documentos requeridos' });
      }
    }

    if (newRole === 'premium' || newRole === 'user') {
      const updatedUser = await this.userRepositoryIndex.updateRole(uid, newRole);
      return res.status(200).json(updatedUser);
    } else {
      return res.status(400).json({ message: 'Rol no válido' });
    }
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error);
    return res.status(500).json({ message: `Error al actualizar el rol del usuario: ${error.message}` });
  }
}


async findInactiveUsers(req, res) {
  try {
    const deadline = req.params.deadline;
    const fiveMinutesAgo = moment().subtract(5, 'minutes').toDate();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

    const inactiveUsers = await UserModel.find({
      last_connection: { $lt: new Date(deadline) },
    });

    if (inactiveUsers.length === 0) {
      // Si no hay usuarios inactivos, responde con un mensaje
      return res.status(200).json({ message: 'No hay usuarios inactivos por el momento' });
    }

    const notificationPromises = inactiveUsers.map(async (user) => {
      try {
        const emailContent = {
          from: TEST_MAIL,
          to: user.email,
          subject: 'Notificación de Cuenta Eliminada',
          html: `<p>Hola ${user.first_name},</p><p>Tu cuenta ha sido eliminada debido a inactividad.</p>`,
        };

        const transporter = createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: TEST_MAIL,
            pass: PASS,
          },
        });

        const info = await transporter.sendMail(emailContent);
        console.log('Account Deletion Notification', info);

        console.log('delete5min', user);

        // Agregar la eliminación del usuario aquí
        const deletedUser = await UserRepositoryIndex.deleteUser(user._id);

        if (deletedUser) {
        } else {
          console.log('se elimino correctamente el usuario:', user._id);
        }
      } catch (error) {
        console.error(`Error al procesar usuario inactivo: ${error.message}`);
      }
    });

    await Promise.all(notificationPromises);
    res.status(200).json({ message: 'Usuarios inactivos eliminados y notificados exitosamente.' });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: 'Error al limpiar usuarios inactivos', message: error.message });
  }
}


}











export default UserController;





