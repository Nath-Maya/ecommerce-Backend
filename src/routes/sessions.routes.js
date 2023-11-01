import { Router } from "express";
import userModel from "../models/users.model.js";
import {
  createHash,
  isValidPassword, 
  authorizedToken,
  generateToken,
} from "../utils.js";
import passport from "passport";

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
  let result = await userModel.saveUser(user);
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


sessionRouter.post("/login", passport.authenticate("login", {
    passReqToCallback: true,
    session: false,
    failureRedirect: "/failedLogin",
    failureMessage: true,
  }),
  (req, res) => {
    const serialUser = {
      id: req.user._id,
      name: `${req.user.first_name}`,
      rol: req.user.rol,
      email: req.user.email,
    };
    req.session.user = serialUser;
    const access_token = generateToken(serialUser);
    res
      .cookie("access_token", access_token, { maxAge: 36000000 })
      .send({ status: "success", payload: serialUser, token: access_token });
  }
);

//! LOGOUT
sessionRouter.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.json({ status: "Logout Error", body: error });
    }
    res.redirect("/");
  });
});

//! FAILED LOGIN
sessionRouter.get("/failedLogin", (req, res) => {
  console.log("failed login");
  res.send({ status: "error", message: "failed login" });
});

//***************** */ LOGIN GITHUB

sessionRouter.post(
  "/registerGit",
  passport.authenticate("registerGithub", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.send({ status: "success", message: "User Register" });
  }
);

sessionRouter.get("/failregister", async (req, res) => {
  res.send({ error: "failed" });
});

sessionRouter.post(
  "/loginGit",
  passport.authenticate("loginGithub", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    console.log("Testing entry to the strategy");

    const { email, password } = req.body;

    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Incorrect Password" });

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
    };
    res.send({ status: "success", payload: req.user });
  }
);

// sessionRouter.get(
//   "/github",
//   passport.authenticate("github", { scope: ["user:email"] }),
//   async (req, res) => {}
// );

// sessionRouter.get(
//   "/githubcallback",
//   passport.authenticate("github", { failureRedirect: "/login" }),
//   async (req, res) => {
//     req.session.user = req.user;

//     res.redirect("/products");
//   }
// );

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user: email'] }), async (req, res) => {

})

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: "/login" }), async (req, res) => {
    req.user = req.user
    res.redirect('/profile')
})

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

sessionRouter.get("current", authorizedToken, (req, res) => {
  res.send({ status: "success", token: token });
});

export default sessionRouter;
