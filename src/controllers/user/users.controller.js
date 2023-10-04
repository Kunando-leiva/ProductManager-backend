import passportCall from "../../utils/passportcall.util.js";
import { generateToken } from "../../utils/jwtUtils.js";
import passport from "passport";
import { v4 as uuidv4 } from 'uuid';
import { createTransport } from "nodemailer";
import { createHash } from "../../utils/Hash.js";



const TEST_MAIL = "aprendisdecoder@gmail.com";
const PASS = "jzfiofblqkoinpie"



class UserController {
  constructor(UserRepositoryIndex) {
    this.UserRepositoryIndex = UserRepositoryIndex;

  }

  async createUser(req, res) {
    const userData = req.body;
  
    if (!userData.email) {
      return res.status(400).json({ error: 'Correo electrónico es un campo requerido' });
    }
  
    try {
      
      const existingUser = await this.UserRepositoryIndex.findUserByEmail(userData.email);
  
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }
  
   
      const newUser = await this.UserRepositoryIndex.createUser(userData);
      const token = generateToken(newUser); 
      res.status(201).json({ user: newUser, token }); 
    } catch (error) {
      console.log("Error en createUser:", error);
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
  try {

    const userToDelete = await this.UserRepositoryIndex.getUserById(id);

    if (!userToDelete) {
      
      return res.status(404).json({ message: "User not found" });
    }

   
    const deletedUser = await this.UserRepositoryIndex.deleteUser(id);

    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    
    res.status(500).json({ message: "Internal Server Error" });
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


async login(req, res) {
  try {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        return res.status(500).json({ status: 'failed', message: err.message });
      }

      if (!user) {
        return res.status(400).json({
          status: 'failed',
          message: 'Usuario o contraseña incorrectos',
        });
      }

      const token = generateToken(user);

      res.cookie('authToken', token, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días de duración
        httpOnly: true,
      });

      res.status(200).json({
        status: 'success',
        access_token: token,
        user: user,
      });
    })(req, res);
  } catch (error) {
    res.status(500).json({ status: 'failed', message: error.message });
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
    
    
    console.log("this.UserRepositoryIndex:", this.UserRepositoryIndex); 


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
  const userId = req.params.uid; 
  const newRole = req.body.newRole; 

  try {
    const user = await this.UserRepositoryIndex.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.role = newRole;
    await user.save();

    return res.status(200).json({ message: `Rol de usuario actualizado a ${newRole}` });
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error); 
    return res.status(500).json({ message: 'Error al actualizar el rol del usuario' });
  }
};



}


export default UserController;





