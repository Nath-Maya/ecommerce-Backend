import express from "express";

const app = express();
const PORT = 8080;

//Decirle al servidor que trabajaremos con JSON y que usara URL.
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//LEVANTAR SERVIDOR

app.listen(PORT, () => {
   console.log("\u001b[1;35m Servidor express Puerto: " + PORT);
});