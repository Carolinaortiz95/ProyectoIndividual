const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    ID: {
      type: DataTypes.UUID,      //genera un numero random
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true

    },

    image: {
      type: DataTypes.STRING,    //porque endpoint de la api me envia por string
      allowNull: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {
      type: DataTypes.TEXT
    },

    score: {
      type: DataTypes.FLOAT,
      
    },

    healthScore:{
      type: DataTypes.FLOAT,
      
    },

    steps: {
      type: DataTypes.TEXT
    },

    createdINBd: {                  //las recetas que guarde en DB, van a tener esta propiedad, por ende es mas facil encontrarlas
      type: DataTypes.BOOLEAN,  
      allowNull: false,  //es mas facil acceder a la receta que tenga en base de datos, porque todos los que cree en DB
      defaultValue: true//van a tener esta propiedad
    }
  });
};
