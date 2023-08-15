import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const JWT_SECRET= "<SECRET>"

export const generateToken = (user) =>{ 
  const token = jwt.sign({ user: { _id: user._id, email: user.email, role: user.role} }, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const verifyToken = (req, res, next) => {
const authHeader= req.headers.authorization;
if (!authHeader) {
    return res.status(401).send("No autenticadoO"); // Enviar código de estado 401 (Unauthorized)
  }
const token = authHeader.split(" ")[1];
jwt.verify(token, JWT_SECRET, (err, credentials) => {
    if (err) {
        return res.status(403).send("Token inválido"); // Enviar código de estado 403 (Forbidden)
      }
    req.user = credentials.user;
    next();
})
}


export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;