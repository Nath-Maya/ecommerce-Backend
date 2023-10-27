import { Router } from "express";
import userModel from "../models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";

const sessionRouter = Router();

//!REGISTER USER
sessionRouter.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password, rol } = req.body; //construccion del cuerpo del registro
  //Validar el ingreso de los datos
  if (!first_name || !last_name || !email || !age)
    return res.status(400).send({ status: "error", error: "Error user " });

  const exist = await userModel.findOne({ email });

  //Error si existe un usuario con el mismo email
  if (exist)
    return res
      .status(400)
      .send({ status: "error", error: "Users already exist" });

  //Luego de la validacion inicializo y creo el usuario.
  //El password hasheado
  const user = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
    rol,
  };

  //Pasamos el user al model por medio del create.
  let result = await userModel.create(user);
  res.send({ status: "sucess", message: "User registered" });
});

//! LOGIN
sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //Validacion del password ingresado
  const user = await userModel.findOne({ email, password });

  if (!user)
    return res
      .status(400)
      .send({ status: "error", error: "Incorrect credentials" });

  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    rol: user.rol,
  };

  res.send({
    status: "sucess",
    payload: req.session.user,
    message: "Nuestro primer logueo",
  });
});

//! LOGOUT
sessionRouter.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.json({ status: "Logout Error", body: error });
    }
    res.redirect("/");
  });
});

export default sessionRouter;
