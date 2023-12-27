import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import config from "../config/config.js";

const KEY = config.keyToken;
const TOKEN_EXPIRATION = config.tokenExpiration;

export const createHash = (password) => {
  try {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  } catch (error) {
    console.error("Error al crear hash:", error);
    throw new Error("Error al crear hash");
  }
};

export const isValidPassword = (user, password) => {
  try {
    return bcrypt.compareSync(password, user.password);
  } catch (error) {
    console.error("Error al comparar contraseñas:", error);
    throw new Error("Error al comparar contraseñas");
  }
};

export const generateToken = (user) => {
  try {
    return jwt.sign({ user }, KEY, { expiresIn: TOKEN_EXPIRATION });
  } catch (error) {
    console.error("Error al generar token:", error);
    throw new Error("Error al generar token");
  }
};

export const authorizedToken = (req, res, next) => {
  const headerAuth = req.headers.authorization;

  if (!headerAuth) {
    return res.status(401).send({ status: "error", error: "No autenticado" });
  }

  const token = headerAuth.split(" ")[1];

  jwt.verify(token, KEY, (error, credentials) => {
    if (error) {
      let errorMessage = "No autorizado";
      if (error.name === "TokenExpiredError") {
        errorMessage = "Token expirado";
      } else if (error.name === "JsonWebTokenError") {
        errorMessage = "Error en el token";
      }

      return res.status(401).send({ status: "error", error: errorMessage });
    }

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
      res.user = user;
      next();
    })(req, res, next);
  };
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};
export class HttpError {
  constructor(description, status = 500, details = null) {
      this.description = description;
      this.status = status;
      this.details = details;
  }
}

