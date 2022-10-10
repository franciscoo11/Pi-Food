const { TypeDiet } = require("../db");

const diets = [
	{
		name: 'Gluten free',
	},
	{
		name: 'Ketogenic',    
	},
	{
		name: 'Vegetarian',
	},
	{
		name: 'Lacto-Vegetarian',
	},
	{
		name: 'Ovo-Vegetarian',
	},
	{
		name: 'Vegan',
	},
	{
		name: 'Pescatarian',
	},
	{
		name: 'Paleolithic',
	},
	{
		name: 'Primal',
	},
	{
		name: 'Whole 30',
	},
]

const getDiets = async (res) => {
  const data = await TypeDiet.findAll();
  if (data.length > 0) return res.status(200).json(data);
  const createDiets = await TypeDiet.bulkCreate(diets);
  res.status(200).json(createDiets);
};


module.exports = {
    getDiets,
}
