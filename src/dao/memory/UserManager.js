
class UserManager {
  constructor() {
    this.user = [];
  }

  async createUser() {
    try{
    console.log("memory dao");
    return this.user;
    } catch(error){
      return error
    }
  }

  async getUserById(id) {
    try {
      const user = await this.user.getUserById(id);
      return user;
    } catch (error) {
      throw new Error("Error al obtener el usuario por ID");
    }
  }

  async verifyPassword(user, password) {
    try {
      return await this.user.verifyPassword(user, password);
    } catch (error) {
      throw new Error("Error al verificar la contraseña");
    }
  }

  async getAllUsers() {
    try {
      return await this.user.getAllUsers();
    } catch (error) {
      throw new Error("Error al obtener todos los usuarios");
    }
  }

  async updateUser(id, updateData) {
    try {
      return await this.user.updateUser(id, updateData);
    } catch (error) {
      throw new Error("Error al actualizar el usuario");
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.user.deleteUser(id);
      if (result) {
        return { message: "Usuario eliminado correctamente" };
      } else {
        throw new Error("No se pudo encontrar el usuario");
      }
    } catch (error) {
      throw new Error("Error al eliminar el usuario");
    }
  }

  async getUserByRole(role) {
    try {
      return await this.user.getUserByRole(role);
    } catch (error) {
      throw new Error("Error al obtener usuarios por rol");
    }
  }

  async logoutUser(req) {
    try {
      return await this.user.logoutUser(req);
    } catch (error) {
      throw new Error("Error al cerrar la sesión del usuario");
    }
  }
}

export default UserManager;
