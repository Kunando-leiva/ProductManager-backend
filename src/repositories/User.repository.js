import UserDTO from "../DTOs/UserDTO.js";

class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createUser(userInfo) {
    try {
      console.log("Desde el repositorio de usuarios");
      const newUserDTO = new UserDTO(userInfo);
      
      const user = await this.dao.createUser(newUserDTO);
      return user; 
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      console.log("Desde el repositorio de usuarios: getAllUsers");
      const users = await this.dao.getAllUsers();
      return users.map((user) => new UserDTO(user));
    } catch (error) {
      throw error;
    }
  }
  
  async getUserById(id) {
    try {
      console.log("Buscando usuario con _id:", id); // Agrega este registro de depuración
      const user = await this.dao.getUserById(id);
      
      if (user) {
        console.log("Usuario encontrado:", user); // Registra el usuario si se encuentra
        return new UserDTO(user);
      } else {
        console.log("Usuario no encontrado"); // Registra un mensaje si no se encuentra
        return null;
      }
    } catch (error) {
      console.error("Error al buscar usuario por _id:", error); // Registra cualquier error
      throw error;
    }
  }

  

  async updateUser(id, updateData) {
    try {
      console.log("Desde el repositorio de usuarios");
      const updatedUser = await this.dao.updateUser(id, updateData);
      return new UserDTO(updatedUser);
    } catch (error) {
      throw error;
    }
  }
  

  async findUserByEmail(email) {
    try {
      const user = await this.dao.findUserByEmail(email);
      if (!user) {
        return null; // Usuario no encontrado
      }
      return new UserDTO(user);
    } catch (error) {
      throw error;
    }
  }
  
  

  async findOneByResetTokenAndExpiration(token, expirationDate) {
    try {
      const user = await this.dao.findOneByResetTokenAndExpiration({
        resetPasswordToken: token.toString(),
        resetPasswordExpires: { $gt: expirationDate },
      });
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return new UserDTO(user);
    } catch (error) {
      throw error;
    }
  }
  



  async deleteUser(id) {
    try {
        console.log("Eliminando usuario con ID:", id); // Agrega registro de depuración
        await this.dao.deleteUser(id);
    } catch (error) {
        console.error('Error al eliminar el usuario:', error); // Agrega registro de depuración
        throw error;
    }
}
  
 

  async getPremium(req, res) {
		try {
			return await this.dao.getPremiumDao(req, res);
		} catch (error) {
			return `${error}`;
		}
	}


  async updateRole(id, newRole) {
    try {
      const user = await this.dao.getUserById(id); // Obtener el usuario por ID

      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      user.role = newRole; // Actualizar el rol
      const updatedUser = await this.dao.updateUser(id, user); // Actualizar el usuario en la base de datos

      return new UserDTO(updatedUser); // Devolver el usuario actualizado
    } catch (error) {
      throw error;
    }
  }

  async findInactiveUsers(deadline) {
    try {
      // Consulta la base de datos para encontrar usuarios inactivos
      const inactiveUsers = await this.dao.findInactiveUsers({
        last_connection: { $lt: new Date(deadline) }, 
      });
  
      console.log("Usuarios inactivos encontrados:", inactiveUsers);
  
      return inactiveUsers;
    } catch (error) {
      throw error;
    }
  }
  

  

 
}

export default UserRepository;
