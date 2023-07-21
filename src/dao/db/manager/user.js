import userModel from "../models/user.js";

const userManager = {
  // Función para crear un nuevo usuario en la base de datos
  createUser: async (userData) => {
    try {
      const newUser = await userModel.create(userData);
      return newUser;
    } catch (error) {
      console.error("Error al crear un nuevo usuario:", error);
      throw error;
    }
  },

  // Función para buscar un usuario por su correo electrónico
  findUserByEmail: async (email) => {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      console.error("Error al buscar usuario por correo electrónico:", error);
      throw error;
    }
  },

  // Función para buscar un usuario por su ID
  findUserById: async (userId) => {
    try {
      const user = await userModel.findById(userId);
      return user;
    } catch (error) {
      console.error("Error al buscar usuario por ID:", error);
      throw error;
    }
  },

  // Función para verificar si las credenciales de inicio de sesión son válidas
  authenticateUser: async (email, password) => {
    try {
      const user = await userModel.findOne({ email, password });
      return user;
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
      throw error;
    }
  },

  // Otras funciones según tus necesidades...

};

export default userManager;
