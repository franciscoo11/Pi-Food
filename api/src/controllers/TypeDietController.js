const { TypeDiet } = require("../db");
const { getApiRecipes } = require("./RecipeController");

// const diets = [
// 	{
// 		name: 'Gluten free',
// 	},
// 	{
// 		name: 'Ketogenic',    
// 	},
// 	{
// 		name: 'Vegetarian',
// 	},
// 	{
// 		name: 'Lacto-Vegetarian',
// 	},
// 	{
// 		name: 'Ovo-Vegetarian',
// 	},
// 	{
// 		name: 'Vegan',
// 	},
// 	{
// 		name: 'Pescatarian',
// 	},
// 	{
// 		name: 'Paleolithic',
// 	},
// 	{
// 		name: 'Primal',
// 	},
// 	{
// 		name: 'Whole 30',
// 	},
// ]

const getDiets = async (res) => {
  //OTRA LOGICA PEGARLE A LA API TRAER TODOS LOS TIPOS DE DIETA Y MAPEARLOS Y UTILIZANDO FINDORCREATE Y LUEGO RETORNARLOS.
  // TRAER TODOS LOS TIPOS DE DIETA DE LAS RECETAS
  // MAPEAR CADA TIPO DE DIETA DENTRO DE UNA RECETA
  // Y POR CADA TIPO APLICA EL FINDORCREATE DEL MODELO DE TIPODEDIETA
  // RETORNARLO
  const apiRecipes = await getApiRecipes();
  const allTypesDiets = apiRecipes.map(recipe => recipe.diets)
  allTypesDiets.forEach(diet => {
	for(const subdiet of diet){
		TypeDiet.findOrCreate({
			where: {
				name: subdiet.name
			}
		})
	}
  });
  
  const allTypeDiet = await TypeDiet.findAll();
  res.status(200).json(allTypeDiet)

//   const data = await TypeDiet.findAll();
//   if (data.length > 0) return res.status(200).json(data);
//   const createDiets = await TypeDiet.bulkCreate(diets);
//   res.status(200).json(createDiets);
};

module.exports = {
    getDiets,
}
