const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthScore: { 
      type: DataTypes.INTEGER,
    },
    stepBystep: {
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    image: {
      type:DataTypes.STRING,
    },
    fromDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:true
    }
  }, {
    timestamps: false
  });
};
