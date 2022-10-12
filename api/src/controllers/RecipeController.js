require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("./../db.js");
const API_URL = "https://api.spoonacular.com/recipes/";
const { API_KEY, API_KEY2, API_KEY3 } = process.env;


const getApiRecipes = async () => {
  const apiRecipes = await axios.get(
    `${API_URL}complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`
  );
  const formatApiRecipes = await apiRecipes.data.results.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary,
      dietTypes: recipe.diets,
      healthScore: recipe.healthScore,
      steps: recipe.analyzedInstructions[0]?.steps.map(e => {
        return { number: e.number, step: e.step}
      }),
      image: recipe.image,
    };
  });

  return formatApiRecipes;
};

const getDbRecipes = async () => {
    return await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
};

const getAllRecipes = async () => {
  const apiRecipes = await getApiRecipes();
  const dbRecipes = await getDbRecipes();
  return [...apiRecipes, ...dbRecipes];
  
};

const getRecipeById = async(id) => {
    const allRecipes = await getAllRecipes();
    if(allRecipes.length) {
      return allRecipes.find(recipe => recipe.id == id)
    }
    return false;
};

module.exports = {
    getApiRecipes, 
    getDbRecipes,
    getAllRecipes,
    getRecipeById,
}
