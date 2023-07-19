require('dotenv').config()
const { Sequelize } = require("sequelize") //la requiero
const ProductsModel = require("../models/ProductsModel")
const OrdersModel = require("../models/OrdersModel")
const OrdersDetailsModel = require("../models/OrdersDetailsModel")

const {
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_USER
} = process.env

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`,{
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
}) //la instancio y le paso un uri, que es la conexion a la db
 // 'postgres://user:pass@example.com:5432/dbname'

ProductsModel(database)
OrdersModel(database)
OrdersDetailsModel(database)

 const { Products, Orders, OrdersDetails } = database.models
 Products.belongsToMany(Orders, { through: OrdersDetails });
 Orders.belongsToMany(Products, { through: OrdersDetails });


  
 module.exports = { 
    ...database.models,
    database }