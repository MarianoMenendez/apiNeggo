const { DataTypes } = require("sequelize")

module.exports = (database) => {
    database.define('OrdersDetails', {
        cantidad: DataTypes.INTEGER,
        precioUnitario: DataTypes.FLOAT,
      });
}