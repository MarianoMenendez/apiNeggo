const { DataTypes } = require("sequelize")

module.exports = (database) => {
    database.define("Products",{
        //Se definen los atributos abajo
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            external_code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: DataTypes.STRING
            },
            price:{
                type: DataTypes.FLOAT,
            },
            image: {
                type: DataTypes.STRING,
            },
            bit_active: {
                type: DataTypes.BOOLEAN,
            },
            bit_new: {
                type: DataTypes.BOOLEAN,
            }
        
        },
        {
            timestamps: false
        }
        )
}

//Ruta que devuelva todas las categorías de productos que hay
//Ruta que cuando vas poniendo un producto despues de las 3 letras devuevle un listado de productos que contienen esa busqueda (debounce, en futuro palabras relacionadas)
