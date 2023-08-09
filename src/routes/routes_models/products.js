const {Router} = require("express")
const { upload } = require("../../services/uploadMulter.js")
const { getAllProductsHandler, getCsvHandler, postUploadDataHandler, postSaveProductsHandler, postSaveImageHandler, getProductHandler } = require("../handlers/products.js")

const router = Router()





router.get("/all", getAllProductsHandler)
//Recibir un csv subido a la web y devolver el json con el listado de productos generado

router.get("/csv/:nombre", getCsvHandler)

// Ruta que recibe un archivo adjunto y lo guarda en una carpeta local
router.post('/upload', upload.single('archivo'), postUploadDataHandler);

// Ruta que guarda los datos de los artículos en formato array
router.post("/save", postSaveProductsHandler);

//Ruta que sube la imagen a un servicio web y devuelve los datos de la imagen --> mejorar con un script que suba las fotos de una carpeta local o en la nube y guarde la data en una base de datos, así se suben más facil las fotos!!
router.post("/image", postSaveImageHandler)


router.get("/", getProductHandler)

module.exports = router



