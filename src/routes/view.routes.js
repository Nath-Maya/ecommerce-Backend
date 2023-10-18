import { Router } from "express";
import Products from "../DAO/dbManager/products.js"

const viewRouter = Router();

const productsManager = new Products();

//! VISTA PRODUCTOS
viewRouter.get('/',async(req,res)=>{
    let products = await productsManager.getAllProducts();
    res.render('home',{products})
})

//! VISTA CHATS
viewRouter.get('/chats',async(req,res)=>{
    res.render('chats')
})

//!VISTA CARRITOS
viewRouter.get('/carts', async (req,res) => {
    res.render('carts')

})

export default viewRouter;