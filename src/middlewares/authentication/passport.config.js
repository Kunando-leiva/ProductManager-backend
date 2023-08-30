import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../../dao/db/models/userModel.js";
import { createHash, isValidPassword } from "../../utils/Hash.js";
import { Strategy, ExtractJwt as _ExtractJwt } from "passport-jwt";
import cookieExtractor from "../../utils/cookieExtractor.util.js";
import config from "../../config/config.js";



const KEY = config.KEY;
const localStrategy = local.Strategy;
const JWTStrategy = Strategy;
const ExtractJwt = _ExtractJwt;

const initializePassport = () => {

 // passport register
 passport.use(
      "register",
      new localStrategy(
        {
          usernameField: "email",
          passReqToCallback: true,
        },
        async (req, username, password, done) => {
          const { first_name, last_name, email, role } = req.body;
          try {
            const user = await userModel.findOne({ email: username });
            if (user) {
              return done(null, false, { message: "User already exists" });
            }
            const newUser = {
              first_name,
              last_name,
              email,
              password: createHash(password),
              role,
            };
            const result = await userModel.create(newUser);
            return done(null, result);
          } catch (error) {
            return done("Error al obtener el usuario" + error);
          }
        }
      )
    );

 // passport local login
    passport.use(
      "login",
      new localStrategy(
        {
          usernameField: "email",
        },
        async (username, password, done) => {
          try {
            const user = await userModel.findOne({ email: username });
            if (!user) {
              return done(null, false, { message: "User not found" });
            }
            if (!isValidPassword(user, password)) {
              return done(null, false, { message: "Wrong password" });
            }
            return done(null, user);
          } catch (error) {
            return done("Error al obtener el usuario" + error);
          }
        }
      )
    );

 //psasport github login  
    passport.use(
      "github",
      new GitHubStrategy(
        {
          clientID: "Iv1.f79a5df5ce24d175",
          clientSecret: "6c38633465b5ccc447bd1913d49f51213cbd937b",
          callbackURL: "http://localhost:8080/sessions/githubcallback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            console.log(profile);
            const user = await userModel.findOne({ email: profile._json.email});
            if (!user) {
              const newUser = {
                first_name: profile._json.name.split(" ")[0],
                last_name: profile._json.name.split(" ")[1],
                email: profile._json.email,
                password: "",
                role: "admin",
              };
              const result = await userModel.create(newUser);
              return done(null, result);
            } else {
              return done(null, user);
            }
          } catch (error) {
            return done("Error al obtener el usuario" + error);
          }
        }
      )
    );

 // passport jwt 
 passport.use("jwt", new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),  
  secretOrKey: `${KEY}`,

}, async (jwt_payload, done) => {
  try {
    const user = await userModel.findById(jwt_payload.user._id);
    if (user) {
      // Usuario encontrado y autenticado correctamente
      return done(null, user);
    } else {
      // Usuario no encontrado o no autenticado
      return done(null, false);
    }
  } catch (error) {
    // Error en la verificación
    return done(error);
  }
}));

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
  
    passport.deserializeUser(async (id, done) => {
      const user = await userModel.findById(id);
      done(null, user);
    });
};
  
      
export default initializePassport;
  
