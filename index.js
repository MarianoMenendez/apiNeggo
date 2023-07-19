// Este archivo tiene la responsabilidad de conectar la DB con el servidor
const server = require("./src/server") // --> Traer el server
const { database } = require("./src/database/db") // --> traer la base de datos para conectarse
require('dotenv').config()
const{ PORT } = process.env // --> puerto de la db

//Responsabilidad de levantar el servidor
database.sync({ alter: true}).then(() =>  //force true: elimina los datos de la db cada vez que levantamos el server --> alter actualiza
    server.listen(PORT || 3001, ()=> {
        console.log(`Server listening on port ${PORT}`)
    })
) 