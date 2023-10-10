import { Router } from "express";
import Products from "../dao/dbManager/products.js"

const router = Router();


const productsManager = new Products();

router.get('/',async(req,res)=>{
    let products = await productsManager.getAllProducts();
    console.log(products);
    res.render('chats',{products})
})

export default router;