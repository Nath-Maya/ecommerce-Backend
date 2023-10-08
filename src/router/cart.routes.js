import { Router } from "express";
import { cartModel } from "../dao/models/carts.model.js";

const router = Router(); //Crear enrutador

//**** GET */

router.get("/", async (req, res) => {
  try {
    let users = await userModel.find(); //Buscar en el modelo de usuario
    res.send({ result: "sucess", payload: users });
  } catch (error) {
    console.log("\u001b[1;34m" + error);
  }
});

//**** POST */

router.post("/", async (req, res) => {
  let { description, quantity, total } = req.body;

  //Valido que los datos esten completos.
  if (!description || quantity || total) {
    res.send({ status: "error", error: "Faltan datos" });
  }
  let result = await cartModel.create({ description, quantity, total }); //Creo el resultado en la base de datos.
  res.send({ result: "sucess", payload: result });
});

//**** PUT */

router.put("/:idCart", async (res,req) => {
  let { idCart} = req.params

  let cartsToReplace = req.body
  if(!cartsToReplace.description || !cartsToReplace.quantity || !cartsToReplace.total) {
    res.send({status:"error" , error:"No hay datos en parametros"})
  }
  let result = await cartModel.updateOne({ _id: idCart }, cartsToReplace);
  res.send({ result: "sucess", payload: result});
})

//**** DELETE */

router.delete("/:idCart", async (res,req) => {
  let { idCart} = req.params

  let result = await cartModel.deleteOne({ _id: idCart });
  res.send({ result: "sucess", payload: result});
})



export default router;
