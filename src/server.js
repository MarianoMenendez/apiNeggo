//Este archivo tiene la responsabilidad configurar el servidor
const express = require('express') //Trae expres para crear el servidor
const routes = require("./routes/index.js") //Trae las rutas que va a usar el servidor
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cookieParser = require('cookie-parser');

const server = express();


server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

server.use('/', routes)

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

module.exports = server;



//npm i -D solo instala para instancias de desarrollo
//npm i para todas las instancias
//una buena practica es crear un versionado para que en caso de modificar la api no rompas proyectos ajenos mientras esta el período de soporte


