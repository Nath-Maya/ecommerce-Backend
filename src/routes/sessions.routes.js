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

sessionRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failedloginauth" }),
  async (req, res) => {
    if (!req.user)
      return res
        .status(400)
        .send({ status: "error", error: "Invalid credentials" });
    // console.log(req.user) //passport authentication, if successfull, returns the user info like in mongoDb in req.user
    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      password: req.user.password,
      cartId: req.user.cartId,
      role: req.user.role,
    };
    res
      .status(200)
      .send({
        status: 200,
        message: `${req.user.first_name} ${req.user.last_name} logged in.`,
      });
  }
);
sessionRouter.get("/failedloginauth", async (req, res) => {
  console.log("Login failed.");
  res.status(400).send({ status: 400, error: "Failed Login." });
});

sessionRouter.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.json({ status: "Logout Error", body: error });
    }
    res.redirect("/");
  });
});

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

sessionRouter.get("current", authorizedToken, (req, res) => {
  res.send({ status: "success", token: token });
});

export default sessionRouter;
