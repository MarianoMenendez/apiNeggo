const { postOrdersControler } = require("../controlers/orders.js")

const getOrdersHandler = async (req,res) => {}

const postOrdersHandler = async (req,res) => {
    try{
        postOrdersControler(req.body)
        res.status(200).send("holix") 
    }
    catch(e){
        res.status(404).send(e.message)
    }
}

module.exports = {
    getOrdersHandler,
    postOrdersHandler
}
