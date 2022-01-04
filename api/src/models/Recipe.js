const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {    //define la tabla 
    ID: {
      type: DataTypes.UUID,      //genera un numero random con letras y numeros
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
      type: DataTypes.TEXT,
      allowNull: false,
      
    },

    score: {
      type: DataTypes.FLOAT,   //float -> puede ser un num decimal o entero
      
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
