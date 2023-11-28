//Dependencias
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import chalk from "chalk";
<<<<<<< HEAD
import FileStore from "session-file-store";
import passport from "passport";
import cookieParser from "cookie-parser";
=======
import * as path from "path"
import FileStore from 'session-file-store'
>>>>>>> main

// Fuentes de metodos, informacion y vistas.
import __dirname from "./utils.js";
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import viewsRouter from "./routes/view.routes.js";
import messageRouter from "./routes/message.routes.js";
<<<<<<< HEAD
import sessionRouter from "./routes/sessions.routes.js";
import usersRouter from "./routes/users.routes.js";
import {initializatedPassport, initPassportGit} from "./config/passport.config.js";
import config from "./config/config.js"
=======
import sessionRouter from "./routes/sessions.routes.js"

>>>>>>> main

//!**** SERVER
//Inicializar variables del Servidor
const app = express();
<<<<<<< HEAD
const PORT = config.port;
const fileStorage = FileStore(session);
=======
const PORT = 8080;
const fileStorage = FileStore(session)
>>>>>>> main

//Decirle al servidor que trabajaremos con JSON y que usara URL.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware
<<<<<<< HEAD
app.use(express.static(__dirname + "/public")); //Rutas
app.use(cookieParser());
=======
app.use(express.static(__dirname + '/public')); //Rutas
>>>>>>> main

//!**** CONECT DATABASE  */
//Validar conexion a la base de datos
mongoose
  .connect(
    config.mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("\u001b[1;36m Connection successful at the database");
  })
  .catch((error) => {
    console.error("\u001b[1;31m Connection failed at the database" + error);
  });

//**** SESSIONS IN DATABASE */
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        config.mongoUrl,
      ttl: 3600,
    }),
    secret: "clave",
    resave: false,
    saveUninitialized: false,
  })
);

//! STRATEGY PASSPORT
initializatedPassport();
initPassportGit()
app.use(passport.initialize());
app.use(passport.session());

//**** HANDLEBARS */

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//? **** RUTAS CRUD - THUNDERCLIENT

app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/", viewsRouter);
app.use("/message", messageRouter);
app.use("/session", sessionRouter);
<<<<<<< HEAD
app.use("/users", usersRouter);
=======
>>>>>>> main

//**** UP SERVER  */
app.listen(PORT, () => {
  console.log(chalk.bgYellowBright.black.bold(`SERVER UP : ${PORT}`));
});
