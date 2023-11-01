import passport from "passport";
import local from "passport-local";
import jwt from "jsonwebtoken";
import Users from "../dao/users.js";
import { createHash, isValidPassword } from "../utils.js";
import gitHubStrategy from "passport-github2";
import KEY from "../utils.js";

const LocalStrategy = local.Strategy;
const userService = new Users();

const initializatedPassport = () => {
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

  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const {
          first_name,
          last_name,
          email,
          age,
          password: userPassword,
        } = req.body;
        try {
          let user = await userService.getUserById({ email: username });
          if (user) {
            console.log("User already exist.");
            return done(null, false);
          }
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(userPassword),
            cartId: "for now, just a string",
          };
          let result = await userService.saveUser(newUser);
          return done(null, result);
        } catch (error) {
          return res.status(400).send({ status: "error", error: "" });
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (userEmail, password, done) => {
        try {
          // const user = await userService.getUserByEmail(userEmail);
          const user = "1@2"
          console.log("soy usermail " + userEmail)
          console.log(password)
          if (!user) {
            console.log("passport.config login strat : user doesnt exist");
            return done(null, false);
          }
          if (!isValidPassword(user, password)) return done(null, false);
          return done(null, user); //cuando esta info sale de aca, queda guardada en req.user
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializatedPassport;
