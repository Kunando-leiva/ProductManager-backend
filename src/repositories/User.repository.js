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
      return user; // Ajusta lo que devuelves según tus necesidades
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      console.log("Desde el repositorio de usuarios");
      const user = await this.dao.getUserById(id);
      return new UserDTO(user.id, user.firstName, user.lastName, user.email, user.role);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, updateData) {
    try {
      console.log("Desde el repositorio de usuarios");
      const updatedUser = await this.dao.updateUser(id, updateData);
      return new UserDTO(updatedUser.id, updatedUser.firstName, updatedUser.lastName, updatedUser.email, updatedUser.role);
    } catch (error) {
      throw error;
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.dao.findOne({ email });
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return new UserDTO(user);
    } catch (error) {
      throw error;
    }
  }

  async findOneByResetTokenAndExpiration(token, expirationDate) {
    try {
      const user = await this.dao.findOne({
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
      console.log("Desde el repositorio de usuarios");
      await this.dao.deleteUser(id);
    } catch (error) {
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

  // Agrega más métodos según tus necesidades
}

export default UserRepository;
