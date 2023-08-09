//Este archivo maneja todas las consultas a la ruta de orders
const { getOrdersHandler, postOrdersHandler } = require("../handlers/orders.js")
const { Router } = require("express")
const router = Router()

router.get("/", (req,res) => {
    res.send("Soy la ruta de Pedidos")
})
router.post("/", postOrdersHandler)


module.exports = router