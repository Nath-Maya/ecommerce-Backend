import { Router } from "express";
import authRoutes from "./authRoutes.js";
import homeRoutes from "./homeRoutes.js";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import chatRoutes from "./chatRoutes.js";
import { generateProducts } from "../../utils/mock.generators.js";
import { logger } from "../../utils/middleware/logger.middleware.js";

const router = Router();

router.use("/home", homeRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);
router.use("/chat", chatRoutes);
router.use("/", authRoutes);

router.get("/mockingproducts", (req,res)=>{
  const products =  (arr = [])=>{
      for(let i =0; i<100; i++)
          arr.push(generateProducts())
      return arr
  }

  res.status('200').send({products: products()})

})

router.get("/loggerTest",(req,res)=>{
  logger.debug("This is a DEBUG message")
  logger.info("This is an INFO message")
  logger.warning("This is a WARN message")
  logger.error("This is an ERROR message")
  logger.fatal("This is a FATAL message")
  res.status(200).send({status: "success", message: "Log successful. Please check console and/or file logs"})
})

router.use("/error", (req, res) => {
  const { errorMessage } = req.flash();
  res.render("error", { errorMessage });
});

router.use("/", (req, res) => {
  res.redirect("/home");
});

router.use("*", (req, res, next) => {
  res.render("notfound");
});
export default router;
