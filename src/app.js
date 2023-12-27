//Dependencias
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import handlebars from "express-handlebars";
import chalk from "chalk";
import FileStore from "session-file-store";
import passport from "passport";
import cookieParser from "cookie-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Fuentes de metodos, informacion y vistas.
import cartRouter from "./routes/cart.routes.js";
import productRouter from "./routes/product.routes.js";
import viewsRouter from "./routes/view.routes.js";
import messageRouter from "./routes/message.routes.js";
import sessionRouter from "./routes/sessions.routes.js";
import usersRouter from "./routes/users.routes.js";
import {
  initializatedPassport,
  initPassportGit,
} from "./config/passport.config.js";
import config from "./config/config.js";
import sendEmail from "./service/mailing.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


//Inicializar variables del Servidor
const app = express();
const PORT = config.port;
const fileStorage = FileStore(session);

//Decirle al servidor que trabajaremos con JSON y que usara URL.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware
app.use(express.static(__dirname + "/public")); //Rutas
app.use(cookieParser());

/*
const ticket = {
  code: 0,
  purchase_datetime: 0,
  purchase_products: 0,
  amount: 0,
  purchaser: 0,
};

await sendEmail(ticket);
*/
//Validar conexion a la base de datos
mongoose
  .connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("\u001b[1;36m Connection successful at the database");
  })
  .catch((error) => {
    console.error("\u001b[1;31m Connection failed at the database" + error);
  });

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      ttl: 3600,
    }),
    secret: "clave",
    resave: false,
    saveUninitialized: false,
  })
);

initializatedPassport();
initPassportGit();
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", handlebars.engine());

app.set("view engine", "handlebars");
app.set('views',__dirname+'/views')
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/", viewsRouter);
app.use("/message", messageRouter);
app.use("/session", sessionRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(chalk.bgYellowBright.black.bold(`SERVER UP : ${PORT}`));
});
