import { createHash, isValidPassword } from "../../utils/Hash.js";
import userModel from "./models/userModel.js";
import cartsModel from "./models/cartsModel.js";

class UserDao {
  constructor(){}

  async createUser(userData) {
    const hashedPassword = createHash(userData.password);
    const user = { ...userData, password: hashedPassword };
    console.log("mongos dao user dao")
    return userModel.create(user);
  }
  
  async getUserById(id) {
    return userModel.findById(id).populate('documents', ['name', 'reference']).lean();
  }
  

  async verifyPassword(user, password) {
    return isValidPassword(user, password);
  }

  async getAllUsers() {
    let user = await userModel.find().populate('cart');
    return user.map(user=>user.toObject())
  }

  async findUserByEmail(email) {
    return userModel.findOne({ email: email });
  }

  async findOneByResetTokenAndExpiration(token, expirationDate) {
    return userModel.findOne({
      resetPasswordToken: token.toString(),
      resetPasswordExpires: { $gt: expirationDate },
    });
  }

  async updateUser(id, updateData) {
    return userModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id) {
    try {
        const result = await userModel.findByIdAndDelete(id); 
        if (!result) {
            throw new Error('Usuario no encontrado');
        }
        return result;
    } catch (error) {
        throw error;
    }
}


  async getUserByRole(role) {
    return userModel.find({ role });
  }

  async logoutUser(req) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ message: "Sesión cerrada correctamente" });
        }
      });
    });
  }

  async updateRole(id, newRole) {
    try {
      const user = await userModel.findById(id); 
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      user.role = newRole;
      await user.save();
      return { success: true, message: `Rol del usuario actualizado a ${newRole}`, user: user.toObject() };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getUserWithDocuments(userData) {
    try {
      const files = userData.files;
      console.log('Archivos del usuario:', files)
      return files;
    } catch (error) {
      console.error('Error al obtener los archivos del usuario:', error);
      throw error;
    }
  }

  async findInactiveUsers(deadline) {
    try {
     
      const inactiveUsers = await userModel.find({
        last_connection: { $lt: new Date(deadline) },
      });

      console.log("Usuarios inactivos encontrados:", inactiveUsers);

      return inactiveUsers;
    } catch (error) {
      throw error;
    }
}
  
  

  
}
  


export default UserDao;







