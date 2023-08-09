const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos adjuntos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo en el servidor (usando la fecha actual para evitar duplicados)
  },
  });

  const upload = multer({ storage });

  module.exports = {
    upload
  }