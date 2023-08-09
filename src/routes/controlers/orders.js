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

const postOrdersControler = async (data) => {
    const { name, products, phoneCode, phoneNumber } = data 
    const celphone = phoneCode + phoneNumber
    const client_fullName = name
    let total = 0

    for(let product of product000s){
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
}

module.exports = {
    postOrdersControler
}