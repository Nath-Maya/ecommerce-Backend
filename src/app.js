import express from "express";
import {DATABASE_NAME, GH_CLIENT_ID, GH_SESSION_SECRET, MDB_HOST, MDB_PASS, MDB_USER, PORT, PROD_ENDPOINT} from "./config/dotenv.config.js";
import { __src_dirname, pathJoin} from "./utils/utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import initializePassport from "./config/passport.config.js";
import passport from "passport";
import { validateResetKey, validateSession, validateSessionAfterLogin } from "./utils/middlewares/session.validations.js";
import apiRouter from "./routes/api.router.js";
import {errorHandler} from "./utils/middlewares/error.handler.js";
import { addLogger, logger } from "./utils/middlewares/logger.handler.js";
import swaggerUiExpress from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./config/options/swagger.options.js";
const HTTPS_RAILWAY_PUBLIC_DOMAIN = RAILWAY_PUBLIC_DOMAIN? `https://${RAILWAY_PUBLIC_DOMAIN}`: null;


const MONGO_URL = `mongodb+srv://${MDB_USER}:${MDB_PASS}@${MDB_HOST}/${DATABASE_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(cookieParser());

logger.info("Connecting to Mongo...")
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 30 * 60,
    }),
    resave: false,
    saveUninitialized: false,
    secret: GH_SESSION_SECRET,
  })
);

app.use(passport.initialize())
app.use(passport.session())
initializePassport(GH_CLIENT_ID, GH_SESSION_SECRET)


app.use(express.static(pathJoin(__src_dirname ,"public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.engine("handlebars", handlebars.engine());
app.set("views", pathJoin(__src_dirname, "views"));
app.set("view engine", "handlebars");


mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {

    app.use(addLogger)

    logger.info("mongoose connected");
    
    app.use("/api", apiRouter);
    app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerJSDoc(swaggerOptions)))


    app.use(errorHandler);

    app.get("/login", validateSessionAfterLogin, async (req, res) => {
      res.render("login", {});
    });

    app.get("/register", validateSessionAfterLogin, async (req, res) => {
      res.render("register", {});
    });

    app.get("/users/reset-password", (req, res) => {
      res.render("initReset",{resetKeyError : req.query.invalid_or_expired_resetid})
    });

    app.get("/users/reset-password/:rpid",validateResetKey, (req, res) => {
      res.render("passwordReset",{})
    });


    app.get("/error", (req, res) => {
      if(req.headers["user-agent"])
        switch (req.statusCode) {
          case 500:
            res.render("error", {
              httpStatus: 500,
              message: "An error has ocurred",
            });
            break;
          default:
            res.render("error", { httpStatus: 404, message: "Not found" });
            break;
        }
      else
      switch (req.statusCode) {
        case 500:
          res.status(500).send("error", {
            httpStatus: 500,
            message: "An error has ocurred",
          });
          break;
        default:
          res.status(404).send({ status: "Error", message: "resource not found" });
          break;
      }
    }); 

    app.use("/",validateSession, viewsRouter);



    app.listen(PORT??3000, () => {
      logger.info(`Servidor iniciado en ${ PROD_ENDPOINT + PORT || "https://localhost:"+ 8080  +"/"} con éxito`);
    });
  });
