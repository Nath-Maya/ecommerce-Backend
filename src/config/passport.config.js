import passport from "passport";
import local from "passport-local";
import UsersDAO from "../dao/mongo/usersDao.js";
import { createHash, generateToken, isValidPassword } from "../utils/utils.js";
import gitHubStrategy from "passport-github2";
import userModel from "../dao/models/users.model.js";
import jwt from "passport-jwt";
import config from "./config.js";

const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const LocalStrategy = local.Strategy;

const userService = new UsersDAO();

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

export const initializatedPassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.secretKey,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

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
              message: "User already exists",
            });
          }
  
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
          };
          let result = await userModel.create(newUser);
  
          // Aquí no debes enviar la respuesta. Deja que Passport maneje la respuesta.
  
          return done(null, result);
        } catch (error) {
          return done("Error de usuario: " + error);
        }
      }
    )
  );
  

  // passport.use(
  //   "register",
  //   new LocalStrategy(
  //     { passReqToCallback: true, usernameField: "email", session: false },
  //     async (req, username, password, done) => {
  //       const { first_name, last_name, email, age } = req.body;
  //       try {
  //         let user = await userModel.findOne({ email: username });
  //         if (user) {
  //           return done(null, false, {
  //             message: "User already exist",
  //           });
  //         }

  //         const newUser = {
  //           first_name,
  //           last_name,
  //           email,
  //           age,
  //           password: createHash(password),
  //         };
  //         let result = await userModel.create(newUser);

  //         const accessToken = generateToken(user);
  //         console.log(accessToken);
  //         res.send({ status: "sucess", accessToken });

  //         return done(null, result);
  //       } catch (error) {
  //         return done("Error de usuario: " + error);
  //       }
  //     }
  //   )
  // );

  passport.use(
    "login",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, { message: "Invalid Credentials" });
          }

          return done(null, user);
        } catch (error) {
          return done(error);
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
};

export const initPassportGit = () => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let user = await githubService.findById(id);
    done(null, user);
  });

  passport.use(
    "github",
    new gitHubStrategy(
      {
        clientID: config.clientId,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackUrl,
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
};
