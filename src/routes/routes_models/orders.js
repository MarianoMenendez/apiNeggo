//Este archivo maneja todas las consultas a la ruta de orders
const {Router} = require("express")

const { Orders, Products } = require("../../database/db")

const getProductVerification = async (orderList) =>{
    const products = []
      for (let {id, count, price} of orderList){
        if (!id) throw Error("Missing id for product option");
        else {
          const product = await Products.findByPk(id);
          if (!product) throw Error("The id was not found in the db");
          else products.push({product,price,count});
        }
      }
    return products
    
}

const router = Router()

router.get("/", (req,res) => {
    res.send("Soy la ruta de Pedidos")
})
router.post("/",async (req,res)=> {
try{
    const {name, products, phoneCode, phoneNumber } = req.body 
    console.log(name, products, phoneNumber, phoneCode)
    const celphone = phoneCode + phoneNumber
    const client_fullName = name
    let total = 0
    for(let product of products){
        total+= product.count*product.price
    }
    const productList = await getProductVerification(products)
    const order = await Orders.create({client_fullName, celphone, total, status: true})
    const ordeList = []
    for (let {product, price, count} of productList){
      const add = await order.addProducts(product, {
        through: { cantidad: count, precioUnitario: price },
      })
      ordeList.push(add[0].dataValues.productId)
    }
    res.status(200).send("holix")
}
catch(e){
    res.status(404).send(e.message)
}
})


module.exports = router