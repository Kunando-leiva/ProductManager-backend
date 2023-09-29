import jwt from "jsonwebtoken"

const JWT_SECRET= "<SECRET>"

export const generateToken = (user) =>{ 
  const token = jwt.sign({ user: { _id: user._id, email: user.email, role: user.role} }, JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const verifyToken = (req, res, next) => {
const authHeader= req.headers.authorization;
if (!authHeader) {
    return res.status(401).send("No autenticadoO"); 
  }
const token = authHeader.split(" ")[1];
jwt.verify(token, JWT_SECRET, (err, credentials) => {
    if (err) {
        return res.status(403).send("Token inválido"); 
      }
    req.user = credentials.user;
    next();
})
}