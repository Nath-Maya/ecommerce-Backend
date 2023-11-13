import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import config from "./config/config.js";

//? KEY
//Clave para la generacion y verificacion de tokens
const KEY = config.keyToken;

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

//? TOKEN
//Generar el token con tiempo de expiracion por 12horas
export const generateToken = (user) => {
  const token = jwt.sign({ user }, KEY, { expiresIn: "1m" });
  return token;
};

//middleware que se utiliza para autenticar las solicitudes
export const authorizedToken = (req, res, next) => {
  const headerAuth = req.headers.authorization;
  if (!headerAuth)
    return res
      .status(401)
      .send({ status: "error", error: "Not authenticated" });

  const token = headerAuth.split(" ")[1];

  jwt.verify(token, KEY, (error, credentials) => {
    //jwt verifica el token existente y corrobora si es un token valido, alterado , expirado.
    console.log(error);
    if (error)
      return res.status(401).send({ status: "error", error: "Not authorized" });
    req.user = credentials.user;
    next();
  });
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      res.user - user;
      next();
    })(req, res, next);
  };
};

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default __dirname;
