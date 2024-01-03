class HomeController {
  async viewHome(req, res) {
    try {
      // console.log("\u001b[1;34m Usuario guardado en session: " + req.user);
      const user = req.user;
      res.render("home", { user });
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }
}

const homeController = new HomeController();
const { viewHome } = homeController;
export { viewHome };
