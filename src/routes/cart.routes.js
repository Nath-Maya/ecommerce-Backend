import { Router } from "express";
import Cart from "../dao/dbManager/carts.js";

const cartRouter = Router(); //Crear enrutador
const cartManager = new Cart();

//**** GET */

cartRouter.get("/", async (req, res) => {
  try {
    let users = await cartManager.getAllCart(); //Buscar en el modelo de usuario
    res.send({ result: "sucess", payload: users });
  } catch (error) {
    console.log("\u001b[1;34m" + error);
  }
});

//**** POST */

cartRouter.post("/", async (req, res) => {
  let { description, quantity, total } = req.body;

  console.log("pase //" + req.body);

  //Valido que los datos esten completos.
  if (!description || !quantity || !total) {
    res.send({ status: "error", error: "Faltan datos" });
  }

  const newProduct = {
    description: description,
    quantity: quantity,
    total: total,
  };
  let result = await cartManager.saveCart(newProduct); //Creo el resultado en la base de datos.

  console.log(result + "Datos Cargados");

  res.send({ status: "success", payload: result });
});

//**** PUT */

cartRouter.put("/:idCart", async (req,res) => {
  let { idCart} = req.params
  let cartsToReplace = req.body
  if(!cartsToReplace.description || !cartsToReplace.quantity || !cartsToReplace.total) {
    res.send({status:"error" , error:"No hay datos en parametros"})
  }
  let result = await cartManager.updateCart(idCart,cartsToReplace);
  res.send({ status: "sucess", payload: result});
})

//**** DELETE */

cartRouter.delete("/:idCart", async (req,res) => {
  let idCart = req.params.idCart
  console.log('--------------------'+idCart)


  let result = await cartManager.deleteCart(idCart);


 res.send("Producto Eliminado");
})


export default cartRouter;
