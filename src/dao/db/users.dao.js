import { createHash, isValidPassword } from "../../utils/Hash.js";
import userModel from "./models/userModel.js";

class UserDao {
  constructor(){}

  async createUser(userData) {
    const hashedPassword = createHash(userData.password);
    const user = { ...userData, password: hashedPassword };
    console.log("mongos dao")
    return userModel.create(user);
  }

  async getUserById(id) {
    return userModel.findById(id);
  }

  async verifyPassword(user, password) {
    return isValidPassword(user, password);
  }

  async getAllUsers() {
    return userModel.find();
  }

  async updateUser(id, updateData) {
    return userModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id) {
    return userModel.findByIdAndDelete(id);
  }

  async getUserByRole(role) {
    return userModel.find({ role });
  }

  async logoutUser(req) {
    // El método `destroy` de `express-session` se usa para eliminar la sesión del usuario
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

  // Agrega más métodos según tus necesidades
}

export default UserDao;







// import userModel from "../models/userModel.js";
// import carritoModel from "../models/carrito.js"; // Asegúrate de importar el modelo de carrito si lo estás utilizando

// class UserDAO {
  
//   // Método para crear un usuario
//   async createUser(userData) {
//     try {
//       // Crear el usuario sin el carrito asociado
//       const newUser = await userModel.create(userData);

//       // Crear el carrito
//       const newCarrito = await carritoModel.create({ productos: [] });

//       // Asociar el carrito al usuario usando el campo 'cart'
//       newUser.cart = newCarrito._id;
//       await newUser.save();

//       // Usar populate para obtener el usuario con el carrito asociado
//       const userWithCart = await userModel.findById(newUser._id).populate('cart'); // Cambiar 'carts' por 'cart'

//       return userWithCart;
//     } catch (error) {
//       console.error("Error al crear un nuevo usuario:", error);
//       throw error;
//     }
//   }

//   // Método para buscar un usuario por ID y populando el campo 'cart'
//   async findUserById(userId) {
//     try {
//       const user = await userModel.findById(userId).populate('cart'); // Cambiar 'carts' por 'cart'
//       return user;
//     } catch (error) {
//       console.error("Error al buscar usuario por ID:", error);
//       throw error;
//     }
//   }

//   // Método para autenticar un usuario y populando el campo 'cart'
//   async authenticateUser(email, password) {
//     try {
//       const user = await userModel.findOne({ email, password }).populate('cart'); // Cambiar 'carts' por 'cart'
//       return user;
//     } catch (error) {
//       console.error("Error al autenticar usuario:", error);
//       throw error;
//     }
//   }

//   // Método para mostrar todos los usuarios y populando el campo 'cart'
//   async getAllUsers() {
//     try {
//       const users = await userModel.find().lean().populate('cart'); // Cambiar 'carts' por 'cart'
//       return users;
//     } catch (error) {
//       console.error("Error al obtener todos los usuarios:", error);
//       throw error;
//     }
//   }

//   // Método para cerrar sesión
//   async logoutUser(req, res) {
//     req.session.destroy();
//     res.redirect("/");
//   }
// }

// export default UserDAO;
