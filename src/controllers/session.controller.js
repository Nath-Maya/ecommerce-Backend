import UsersDAO from "../dao/mongo/usersDao.js";
import UserDTO from "../dto/user.dto.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import userModel from "../dao/models/users.model.js";
// import { addLogger } from "../../utils/logger.js";


class SessionController{
    async gitCallback(req,res){
        req.session.user=req.user
        res.redirect("/products")
    }
    async register(req,res){
        res.send({status:"success",message:"User Registered"})
    }

    async failRegister(req,res){
        res.send({error:"failed"})
    }
    async login (req,res){ 
        const {email , password} = req.body
       
            const currentDate = new Date()
            console.log('mostrame tus datos' +email + password)
            await userModel.findOne({email})
            await userModel.updateOne({_id:req.user._id},{last_connection: currentDate })
            console.log('llegue')
            if (!req.user) return res.status(400).send({status:"error", error:"Wrong password"})
            req.session.user={
            first_name:req.user.first_name,
            last_name:req.user.last_name,
            age: req.user.age,
            email:req.user.email,
            password:req.user.password,
           // cart:req.user.cart._id,
            rol:req.user.rol}
            res.send({status:"success",payload: req.user})
            
        
    }
    async failLogin(req,res){        
        
        res.status(401).json({ message: "Credenciales incorrectas" });
       //res.redirect("/")
    
    }
    async recoverPass (req,res){
        const {email,password} = req.body
        if (!email||!password) return res.status(400).send({status:"error", error:"Missing user credentials"})
        const user = await userModel.findOne({email})
        if (!user) return res.status(400).send({status:"error",error:"Incorrect credentials"})
        await userModel.updateOne({ _id: user._id}, { password: createHash(password) })    
        return res.status(200).send({status:"ok",message:"Contraseña actualizada"})
    }
    async currentUser(req,res){
        const currentUser = new UserDTO(req.session.user)
        res.send({status:"ok",payload: currentUser})
    }

}
const sessionController = new SessionController()
const {
    gitCallback,
    register,
    failRegister,
    login,
    failLogin,
    recoverPass,
    currentUser
} = sessionController
export{
    gitCallback,
    register,
    failRegister,
    login,
    failLogin,
    recoverPass,
    currentUser
}