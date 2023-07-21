const {Router} = require("express")
const multer = require('multer');
const csvParser = require('csv-parser')
const fs = require('fs')
const path = require('path');
const server = require("../../server");
const { Products } = require("../../database/db")
const axios = require("axios")
const router = Router()
const { Op } = require('sequelize');
require('dotenv').config()

const { KEY } = process.env

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos adjuntos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo en el servidor (usando la fecha actual para evitar duplicados)
  },
  });

  const upload = multer({ storage });

router.get("/all", async (req,res) => {
  try{
    const products = await Products.findAll()
    res.json(products)
  }
  catch(error){
    res.send(error.message)
  }
})
//Recibir un csv subido a la web y devolver el json con el listado de productos generado
router.get("/csv/:nombre", async (req, res) => { 
    //lee un json y segun el nombre de la primer fila va creando un objeto de js con cada elemento, separa por, no toma las tildes
    try{
        const {nombre} = req.params
        async function parseadorCsv (fileName) {
          return new Promise((resolve, reject) => {
            const resultados = [];
            fs.createReadStream(`C:/Users/Usuario/Desktop/Shower/Plataforma Shower/apiNeggo/uploads/${fileName}`,{encoding: 'utf8'}) // Reemplaza 'ruta_del_archivo.csv' con la ruta real del archivo CSV.
            .pipe(csvParser({ separator: ';' }))
            .on('data', (row) => {
              resultados.push(row);
            })
            .on('end', () => {
              resolve(resultados)
            })
            .on('error', (error) => {
              reject(error)
            });
          })
        }
  
        const arrayjson = await parseadorCsv(nombre)
        console.log(arrayjson)
        res.json(arrayjson);
    }
    catch(error){ 
        console.log(error)
    }
})
// Ruta que recibe un archivo adjunto y lo guarda en una carpeta local
router.post('/upload', upload.single('archivo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se proporcionó ningún archivo.');
  }
  // Se recibió el archivo y se guardó en 'uploads/' con el nombre generado

  // Puedes hacer cualquier procesamiento adicional aquí si es necesario
  res.status(200).send({filename: req.file.filename});
});

// Ruta que guarda los datos de los artículos en formato array
router.post("/save", async (req, res) => {
  try {
    const { products } = req.body;

    const productsFormatted = products.map((product) => {
      return {
        external_code: product["external_code"],
        name: product.name,
        category: product.category,
        price: parseFloat(product.price),
        image: product.image,
        bit_active: product["bit_active"],
        bit_new: product["bit_new"],
      };
    });

    console.log(productsFormatted);

    const savedProducts = await Products.findAll({
      where: { external_code: productsFormatted.map((product) => product["external_code"]) },
    });
    console.log("Saved Products", savedProducts);
    
    const savedCodes = savedProducts.map((product) => product.external_code);
    
    console.log("Saved Codes", savedCodes);
    
    const updateProducts = productsFormatted.filter((product) => savedCodes.includes(product["external_code"]));
    const newProducts = productsFormatted.filter((product) => !savedCodes.includes(product["external_code"]));

    console.log("New Products", newProducts.length);

    const options = {
      validate: true,
      updateOnDuplicate: ["price", "image", "bit_active", "bit_new"],
    };

    newProducts.length && (await Products.bulkCreate(newProducts, { validate: true }));
    console.log("Success");
    updateProducts.length && (await Products.bulkCreate(updateProducts, options));

    res.status(200).send("Success");
  } catch (error) {
    console.error("Error", error);
    res.status(400).send(error);
  }
});
//Ruta que sube la imagen a un servicio web y devuelve los datos de la imagen --> mejorar con un script que suba las fotos de una carpeta local o en la nube y guarde la data en una base de datos, así se suben más facil las fotos!!
router.post("/image", async (req,res)=>{
  const formData = new FormData();
  formData.append('image', req.body.image);
  try {
    const imageData = await axios.post(`https://api.imgbb.com/1/upload?key=${KEY}`, formData)
    res.status(200).send(imageData.data)
  }
  catch(error){
    console.log(error)
    res.status(400).send(error)
  }
})
router.get("/", async (req,res)=>{
  try{
  const { name } = req.query
  console.log(name)
  const product = await Products.findAll({
    where: { 
        name: {
            [Op.iLike]: `%${name}%`
          }}
    })
    const products = product.map(product => product.dataValues )
    if(!product.length) throw Error(`The product ${name} was not found`) // Error "El pais xxx no se encontró"
    else res.status(200).json(products)
  }
  catch(error){
    res.status(400).send(error.message)
  }
})

module.exports = router