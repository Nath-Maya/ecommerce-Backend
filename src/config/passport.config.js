import passport from "passport";
import local from "passport-local";
import jwt from "jsonwebtoken";
import Users from "../dao/users.js";
import { createHash, isValidPassword } from "../utils.js";
import gitHubStrategy from "passport-github2";
import KEY from "../utils.js";
import userModel from "../models/users.model.js";
import Cart from "../dao/carts.js";
import cartModel from "../models/carts.model.js";

const LocalStrategy = local.Strategy;
const userService = new Users();

const initializatedPassport = () => {
  //! GITHUB

  passport.use(
    "github",
    new gitHubStrategy(
      {
        clientID: "Iv1.c1ee39f6859ad22e",
        clientSecret: "16cd1f1d7a8b72818beddd30a9ded2124d0dcad9",
        callbackURL: "http://localhost:8080/session/githubcallback",
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          let email = "";
          if (profile._json.email) {
            email = profile._json.email;
          } else {
            email = `GitHubUser-${profile._json.login}`;
          }

          let user = await userService.getUserById({ email });

          if (!user) {
            let newUser = {
              first_name: profile._json.name || "",
              last_name: "",
              email,
              password: "",
            };
            let result = await userService.saveUser(newUser);
            return done(null, result);
          } else {
            return done(null, user);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //! SERIALIZE - DESERIALIZE

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userService.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  //! REGISTER

  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          let user = await userModel.findOne({ email: username });
          if (user) {
            return done(null, false, {
              message: "User already exist",
            });
          }

          //Crear el USUARIO
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          let result = await userModel.create(newUser);

          return done(null, result);
        } catch (error) {
          return done("Error de usuario: " + error);
        }
      }
    )
  );
  //! LOGIN

  passport.use(
    "login",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializatedPassport;
