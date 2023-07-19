// Este archivo tiene la responsabilidad de crear las rutas del servidor

const { Router } = require("express");
const productsRouter = require("./routes_models/products")
const ordersRouter = require("./routes_models/orders")


const router = Router()

router.use("/products", productsRouter)
router.use("/orders", ordersRouter)
router.get("/", (req,res)=>{
    res.json("Hola soy el servidor")
})

//como es una promesa quiero que mi servidor se levante despues de conectarme a la db


//Ruta que guarde en la bd los artículos los articulos ---> listo
//Ruta que transforme un csv a un formato json --> listo
//Ruta que actualice el precio de un artículo con su código --> listo
//Ruta que permita subir imágenes y guardarlas en un servicio web y las guarde en la db
//Ruta que permita actualizar todos los artículos de la db --> listo
//Ruta que cree un pedido
//Ruta que consulte por un pedido y traiga todos los artículos
//Ruta que actualice un pedido
module.exports = router