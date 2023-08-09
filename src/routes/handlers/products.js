const { postSaveProductsControler, getArrayCorntroler, postSaveImageContoler, getProductControler } = require("../controlers/products.js")


const getAllProductsHandler = async (req,res) => {
    try{
      const products = await Products.findAll()
      res.json(products)
    }
    catch(error){
      res.send(error.message)
    }
  }

  const getCsvHandler = async (req, res) => { 
    //lee un json y segun el nombre de la primer fila va creando un objeto de js con cada elemento, separa por, no toma las tildes
    try{
        const arrayJson = getArrayCorntroler(req.params)
        res.json(arrayJson);
    }
    catch(error){ 
        console.log(error)
    }
}

const postUploadDataHandler = (req, res) => {
    if (!req.file) {
      return res.status(400).send('No se proporcionó ningún archivo.');
    }
    // Se recibió el archivo y se guardó en 'uploads/' con el nombre generado
  
    // Puedes hacer cualquier procesamiento adicional aquí si es necesario
    res.status(200).send({filename: req.file.filename});
  }

const postSaveProductsHandler = async (req, res) => {
    try {
        postSaveProductsControler(req.body)
        res.status(200).send("Success");
    } catch (error) {
      res.status(400).send(error);
    }
  }

  const postSaveImageHandler = async (req,res)=>{
    try {
        const imageData = postSaveImageContoler(req.body.image)
        res.status(200).send(imageData.data)
    }
    catch(error){
        res.status(400).send(error)
    }
  }

  const getProductHandler = async (req,res)=>{
    try{
        const product = getProductControler(req.query)
        if(!product.length) throw Error(`The product ${name} was not found`) // Error "El pais xxx no se encontró"
        else res.status(200).json(products)
    }
    catch(error){
        res.status(400).send(error.message)
    }
  }

module.exports = {
    getAllProductsHandler,
    getCsvHandler,
    postUploadDataHandler,
    postSaveProductsHandler,
    postSaveImageHandler,
    getProductHandler
}