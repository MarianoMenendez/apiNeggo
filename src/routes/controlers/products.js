const { Products } = require("../../database/db")
const axios = require("axios")
const { Op } = require('sequelize');
require('dotenv').config()
const { KEY } = process.env
const { parseadorCsv } = require("../../services/parseadorCsv.js")

const postSaveProductsControler = async (data) => {
    const { products } = data;
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

    const savedProducts = await Products.findAll({
      where: { external_code: productsFormatted.map((product) => product["external_code"]) },
    });

    const savedCodes = savedProducts.map((product) => product.external_code);

    const updateProducts = productsFormatted.filter((product) => savedCodes.includes(product["external_code"]));
    const newProducts = productsFormatted.filter((product) => !savedCodes.includes(product["external_code"]));

    const options = {
      validate: true,
      updateOnDuplicate: ["price", "image", "bit_active", "bit_new"],
    };

    newProducts.length && (await Products.bulkCreate(newProducts, { validate: true }));
    updateProducts.length && (await Products.bulkCreate(updateProducts, options));
  }

  const getArrayCorntroler = async (data) => {
    const {nombre} = data
    
    const arrayjson = await parseadorCsv(nombre)
    return arrayjson
  }

  const postSaveImageContoler = async (data) => {
    const formData = new FormData();
    formData.append('image', data);
    const imageData = await axios.post(`https://api.imgbb.com/1/upload?key=${KEY}`, formData)
  }

  const getProductControler = async (data) => {
    const { name } = data
    console.log(name)
    const product = await Products.findAll({
      where: { 
          name: {
              [Op.iLike]: `%${name}%`
            }}
      })
      const products = product.map(product => product.dataValues )
      return products
  }

  module.exports = {
    postSaveProductsControler,
    getArrayCorntroler,
    postSaveImageContoler,
    getProductControler
  }