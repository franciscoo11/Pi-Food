require("dotenv").config();
const axios = require("axios");
const { Recipe, TypeDiet } = require("./../db.js");

const API_URL = "https://api.spoonacular.com/recipes";
const { API_KEY, API_KEY2, API_KEY3 } = process.env;

const getApiRecipes = async () => {
  const apiData = await axios.get(
    `${API_URL}/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`
  );

  const apiRecipes = await apiData.data.results.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      diets: recipe.diets.map((diet) => {
        return { name: diet };
      }),
      healthScore: recipe.healthScore,
      summary: recipe.summary,
      analyzedInstructions: recipe.analyzedInstructions,
      image: recipe.image,
    };
  });
  return apiRecipes;
};

const getDbRecipes = async () => {
  return await Recipe.findAll({
    include: {
      model: TypeDiet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const dataFromApiAndDb = await Promise.all([getApiRecipes(), getDbRecipes()]);
  let [recipesFromApi, recipesFromDb] = dataFromApiAndDb;

  return recipesFromApi.concat(recipesFromDb);
};

const getRecipeById = async (res,id) => {
  if (!id) throw new Error("Debe suministrar un ID.");
  const allRecipes = await getAllRecipes();
  const recipeById = await allRecipes.find(
    (recipe) => recipe.id === parseInt(id)
  );
  recipeById
    ? res.status(200).json(recipeById)
    : res.status(404).json({ error: "No se encontro la receta." });
};

module.exports = {
  getRecipeById,
  getAllRecipes,
  getApiRecipes,
  getDbRecipes,

};
