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

  if (email == "adminCoder@coder.com" && password == "adminCod3r123")
  user.rol = "admin";
  //Pasamos el user al model por medio del create.
  let result = await userModel.create(user);
  res.send({ status: "sucess", message: "User registered" });
});

//! LOGIN
sessionRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //Validacion del password ingresado
  if (!email || !password) {
    return res.status(400).send({ status: "error", error: "Error User" });
  }
  const user = await userModel.findOne(
    { email: email },
    { email: 1, first_name: 1, last_name: 1, password: 1 }
  );

  if (!user) {
    return res.status(400).send({ status: "error", error: "Error User" });
  }

  if (!isValidPassword(user, password)) {
    return res.send({ status: "error", error: "Error Credentials" });
  }


  req.session.user = user;
  res.send({ status: "success", payload: user });
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
