import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/db/models/user.js";
import { createHash, isValidPassword } from "../utils.js";

const localStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
      "register",
      new localStrategy(
        {
          usernameField: "email",
          passReqToCallback: true,
        },
        async (req, username, password, done) => {
          const { first_name, last_name, email } = req.body;
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
            };
            const result = await userModel.create(newUser);
            return done(null, result);
          } catch (error) {
            return done("Error al obtener el usuario" + error);
          }
        }
      )
    );
  
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
  
    passport.use(
      "github",
      new GitHubStrategy(
        {
          clientID: "Iv1.f79a5df5ce24d175",
          clientSecret: "e1cce9c0a666633a33adfd34d49615dcf2fb17ad",
          callbackURL: "http://localhost:8080/api/sessions/githubcallback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const user = await userModel.findOne({ email: profile._json.email });
            if (!user) {
              const newUser = {
                first_name: profile._json.name.split(" ")[0],
                last_name: profile._json.name.split(" ")[2],
                email: profile._json.email,
                password: "",
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
  
    passport.serializeUser((user, done) => {
      done(null, user._id);
    });
  
    passport.deserializeUser(async (id, done) => {
      const user = userModel.findById(id);
      done(null, user);
    });
  };
  
  export default initializePassport;
  
