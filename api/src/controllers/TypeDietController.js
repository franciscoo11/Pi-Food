const { TypeDiet } = require("../db");

// TODO ARRAY DE TIPOS DE DIETAS ...

const getDiets = async (res) => {
  const data = await TypeDiet.findAll();
  if (data.length > 0) return res.status(200).json(data);
  const createDiets = await Diets.bulkCreate(arrayTypeDiet);
  res.status(200).json(createDiets);
};


module.exports = {
    getDiets,
}
