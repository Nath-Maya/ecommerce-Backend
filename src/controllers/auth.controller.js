import userDTOResponse from "../dto/responses/user.response.dto.js";

class AuthController {
  async viewLogin(req, res) {
    try {
      res.render("login");
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async viewRegister(req, res) {
    try {
      res.render("register");
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await req.user;
      const userDTO = new userDTOResponse(user);
      res.json(userDTO);
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }
  async logout(req, res) {
    req.logout(function (err) {
      if (err) {
        console.error(err);

        return res.redirect("/error");
      }
      res.render("login");
    });
  }

  async redirectToHome(req, res) {
    res.redirect("/home");
  }

  async productsList(req, res) {
    res.redirect("/products");
  }
}

const authController = new AuthController();
const {
  viewLogin,
  viewRegister,
  getCurrentUser,
  logout,
  redirectToHome,
  productsList,
} = authController;
export {
  viewLogin,
  viewRegister,
  getCurrentUser,
  logout,
  redirectToHome,
  productsList,
};
