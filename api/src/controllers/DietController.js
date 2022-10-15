const { Diet } = require('../db');
const { getApiRecipes } = require('../controllers/RecipeController')


const getAllDiets = async (req, res, next) => {
  try {
    const apiResponse = await getApiRecipes();
    const formatApiDiets = apiResponse?.map((recipe) => recipe.diets); // PONGO COMO OPTIONAL LA APIRESPONSE POR QUE PUEDE NO LLEGARME NADA
    const apiDiets = formatApiDiets?.flat(1); // SACO ARRAY DENTRO DE OTRO ARRAY Y LO COMBIERTO EN UNO SOLO.
    const finalDiets = [...new Set(apiDiets), "vegetarian"]; // ELIMINO DIETAS REPETIDAS Y LE ANEXO vegetarian YA QUE NO SE ENCUENTRA DENTRO DE DIETAS SINO QUE ES UNA PROPIEDAD DE LAS RECETAS.
    finalDiets.forEach(async (d) => {
      await Diet.findOrCreate({
        where: { name: d },
      });
    });
    const alldietsDB = await Diet.findAll();
    return res.status(200).json(alldietsDB);
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAllDiets,
}