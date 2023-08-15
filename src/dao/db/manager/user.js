import userModel from "../models/user.js";


const userManager = {
 //metodo para crear un usuario
 createUser: async (userData) => {
  try {
    // Crear el usuario sin el carrito asociado
    const newUser = await userModel.create(userData);

    // Crear el carrito
    const newCarrito = await carritoModel.create({ productos: [] });

    // Asociar el carrito al usuario usando el campo 'cart'
    newUser.cart = newCarrito._id;
    await newUser.save();

    // Usar populate para obtener el usuario con el carrito asociado
    const userWithCart = await userModel.findById(newUser._id).populate('carts');

    return userWithCart;
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);
    throw error;
  }
},

  // metodo para buscar un usuario por ID y populando el campo 'cart'
  findUserById: async (userId) => {
    try {
      const user = await userModel.findById(userId).populate('carts');
      return user;
    } catch (error) {
      console.error("Error al buscar usuario por ID:", error);
      throw error;
    }
  },

  // metodo para buscar un usuario por ID
  findUserById: async (userId) => {
    try {
      const user = await userModel.findById(userId);
      return user;
    } catch (error) {
      console.error("Error al buscar usuario por ID:", error);
      throw error;
    }
  },

  // metodo para autenticar un usuario y populando el campo 'cart'
  authenticateUser: async (email, password) => {
    try {
      const user = await userModel.findOne({ email, password }).populate('carts');
      return user;
    } catch (error) {
      console.error("Error al autenticar usuario:", error);
      throw error;
    }
  },

  // metodo para mostrar todos los usuarios y populando el campo 'cart'
  getAllUsers: async () => {
    try {
      const users = await userModel.find().lean().populate('carts');
      return users;
    } catch (error) {
      console.error("Error al obtener todos los usuarios:", error);
      throw error;
    }
  },

  //metodo para cerrar sesion
  logoutUser: async (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },



};



export default userManager;
