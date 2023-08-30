class UserService {
  constructor(userDao) {
    this.userDao = userDao;
  }

  async createUser(userData) {
    return this.userDao.createUser(userData);
  }

  async getUserById(id) {
    return this.userDao.getUserById(id);
  }

  async getAllUsers() {
    return this.userDao.getAllUsers();
  }

  async updateUser(id, updateData) {
    return this.userDao.updateUser(id, updateData);
  }

  async deleteUser(id) {
    return this.userDao.deleteUser(id);
  }

  async getUsersByRole(role) {
    return this.userDao.getUserByRole(role);
  }

  async authenticateUser(email, password) {
    const user = await this.userDao.getUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    if (!this.userDao.verifyPassword(user, password)) {
      throw new Error("Incorrect password");
    }
    const token = generateToken(user);
    return { user, token };
  }
}

export default UserService;










  
 
// async register(req, res) {
//   if (!req.user)
//     return res.status(400).send({
//       status: "failed",
//       message: "El usuario ya existe",
//     });
//   req.session.user = req.user;
//   const access_token = generateToken(req.user);
//   res.send({ status: "success", access_token, user: req.user });

// }


// async githubCallback(req, res) {
//     const token = generateToken(req.user);
//     res.cookie("authToken", token, {maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true})
    
//     res.redirect("/menu");
// }

// async login(req, res) {
//   console.log("Usuario autenticado:", req.user);
//   if (!req.user) {
//     console.log(req.user);
//     return res.status(400).send({
//       status: "failed",
//       message: "Usuario o contraseña incorrectos",
//     });
//   }
//   const access_token = generateToken(req.user);
//   res.send({ status: "success", access_token, user: req.user });


// }

// async logout(req, res) {
//     req.logout();
//     res.redirect("/login");
// }





// }

// export default UserServices;