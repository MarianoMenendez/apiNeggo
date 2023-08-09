const csvParser = require('csv-parser')
const fs = require('fs')
const path = require('path');


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

module.exports = {
    parseadorCsv
}