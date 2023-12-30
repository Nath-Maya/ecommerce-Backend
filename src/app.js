import express from "express";
import chalk from "chalk";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import indexRoutes from "./routes/mongo/indexRoutes.js";
import websockets from "./websockets/websockets.js";
import exphbs from "express-handlebars";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { connectMongoDB } from "./config/configMongoDB.js";
import cookieParser from "cookie-parser";
import {
  sessionConfig,
  passportInitialize,
  passportSession,
} from "./config/session-config.js";
import flash from "connect-flash";
import CONFIG from "./config/config.js";

const app = express();
const { PORT } = CONFIG;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);

websockets(io);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("mySecret"));
app.use(sessionConfig);
app.use(passportInitialize);
app.use(passportSession);
app.use(flash());

const handlebars = exphbs.create({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
});

app.engine("handlebars", handlebars.engine);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", indexRoutes);

connectMongoDB();

const server = httpServer.listen(PORT, () =>
  console.log(
    chalk.bgYellowBright.black.bold(
      `🚀  SERVER UP : ${PORT}.at ${new Date().toLocaleString()}`
    )
  )
);
server.on("error", (err) => console.log(err));
