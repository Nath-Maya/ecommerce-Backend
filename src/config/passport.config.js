import passport from "passport";
import local from "passport-local";
import jwt from "jsonwebtoken"
import Users from "../dao/users.js";
import { createHash, isValidPassword } from "../utils.js";
import gitHubStrategy from "passport-github2";
import KEY from "../utils.js"

const LocalStrategy = local.Strategy;
const userService = new Users();



const initializatedPassport = () => {

  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
          let user = await userService.getUserById({ email: username });
          if (user) {
            console.log("User already exist");
          }

          const userNew = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          let result = await userService.saveUser(userNew);
          return done(null, result);
        } catch (error) {
          return done("error en usuario" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req, email, password, done) => {
        try {
          console.log("req:" + req + "email:" + email + " " + password);
          const user = await userService.getUserById({ email: email });
          if (!user) return done(null, false, { message: "User not found" });
          const validatePassword = isValidPassword(user, password);
          if (!validatePassword)
            return done(null, false, { message: "incorrect Password" });
          return done(null, user);
        } catch (error) {
          return done(null, error);
        }
      }
    )
  );

 

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
          let user = await userService.getUserById({ email: profile._json.email });
          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: profile._json.family_name || "",
              email: profile._json.email,
              age: "",
              role: "user",
              password: "",
            };
            let result = await userService.saveUser(newUser);
            user = result; // asigna el nuevo usuario al objeto user
          }

          // Generar un token JWT con la información del usuario
          const token = jwt.sign({ user }, KEY, { expiresIn: "1h" });

          // Pasar el token al callback 'done'
          done(null, token);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
    console.log(user)
  });
  
  passport.deserializeUser(async (id, done) => {
    let user = await userService.getUserById({_id:id});
    console.log(user)
    done(null, user);
  });
  /*
  passport.use(
    "github",
    new githubService(
      {
        clientID: " Iv1.c1ee39f6859ad22e",
        clientSecret: "16cd1f1d7a8b72818beddd30a9ded2124d0dcad9",
        callbackURL: "http://localhost:8080/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await  userService.getUserById({ email: profile._json.email });

          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: profile._json.name,
              age: 18,
              email: profile._json.email,
              password: "req",
            };
            let result = await  userService.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  */
};

export default initializatedPassport
