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
    return userModel.find().populate("cart");
  }

  async findUserByEmail(email) {
    return userModel.findOne({ email });
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
    return userModel.findByIdAndDelete(id);
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

  async getPremiumDao(req, res) {
		try {
			const { uid } = req.params;
			const user = userModel.findById(uid);
			if(!user) return `User doesn't exist.`
			return await userModel.updateOne({ _id: uid }, { role: 'premium' });
		} catch (error) {
			return `${error}`;
		}
	}
  
}

export default UserDao;







