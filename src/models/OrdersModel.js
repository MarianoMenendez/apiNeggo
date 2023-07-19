const { DataTypes } = require("sequelize")

module.exports = (database) => {
    database.define("Orders",{
        //Se definen los atributos abajo
            id_Pedido: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            client_fullName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            celphone:{
                type: DataTypes.STRING,
                allowNull:false,
            },
            total: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
        },
        )
}

//Ruta que devuelva en json todos los pedidos realizados sin terminar
//Ruta que devuelva en json todos los pedidos realizados terminados