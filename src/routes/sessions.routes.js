import { Router } from "express";
import userModel from "../models/users.model.js.js.js.js";
import { authorizedToken, generateToken } from "../utils.js.js.js.js";
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
