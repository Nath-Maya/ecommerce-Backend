import { Router } from "express";
import userModel from "../models/users.model.js";
<<<<<<< HEAD
import { authorizedToken, generateToken } from "../utils.js";
import passport from "passport";

const sessionRouter = Router();

//!   REGISTER

sessionRouter.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.send({ status: "succes", message: "User registered" });
  }
);
sessionRouter.get("/failedregister", async (req, res) => {
  res.send({ error: "Failed register." });
});

//!   LOGIN

sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    passReqToCallback: true,
    session: false,
    failureRedirect: "api/sessions/failedLogin",
    failureMessage: true,
  }),
  (req, res) => {
    const serialUser = {
      id: req.user._id,
      name: `${req.user.first_name}`,
      role: req.user.role,
      email: req.user.email,
    };
    req.session.user = serialUser;
    const access_token = generateToken(serialUser);
    res
      .cookie("access_token", access_token, { maxAge: 10000 })
      .send({ status: "success", payload: serialUser , token : access_token });
  }
);
sessionRouter.get("/failedloginauth", async (req, res) => {
  console.log("Login failed.");
  res.status(400).send({ status: 400, error: "Failed Login." });
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

//! GITHUB

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  async (req, res) => {}
);

sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

sessionRouter.post("/reset", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(404).send({
      status: "error",
      error_description: "All fields are required",
    });

  const user = await userModel.findOne({ email: email });

  if (!user)
    return res.status(400).send({ status: "error", error: "User not found" });

  user.password = password;
  user.save();

  res.send({
    status: "success",
    message: "Password reset correctly",
  });
});


sessionRouter.get('/current', passport.authenticate('jwt', {session: false}), (req,res)=> {
  res.send(req.user)
})

export default sessionRouter;
=======

const sessionRouter = Router();

//!REGISTER USER
sessionRouter.post("/register", async (req, res) => {
  //construccion del cuerpo del registro
  const { first_name, last_name, email, age, password, rol } = req.body;
  //validacion e identificacion dentro del model creado.
  const exist = await userModel.findOne({ email });

  //Error si existe un usuario con el mismo email
  if (exist)
    return res
      .status(400)
      .send({ status: "error", error: "Users already exist" });

  //Luego de la validacion inicializo y creo
  const user = {
    first_name,
    last_name,
    email,
    age,
    password,
    rol
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
    rol: user.rol
  };

  res.send({
    status: "sucess",
    payload: req.session.user,
    message: "Nuestro primer logueo",
  });
});

//! LOGOUT
sessionRouter.get("/logout", async (req,res) => {
  req.session.destroy((error) =>{
    if(error)
    {
        return res.json({ status: 'Logout Error', body: error})
    }
    res.redirect('/')
})    

})

export default sessionRouter;
>>>>>>> main
