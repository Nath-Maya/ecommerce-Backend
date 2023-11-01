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
    done(null, user._id)
  })

  
  
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userService.getUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializatedPassport
