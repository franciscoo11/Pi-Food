require("dotenv").config();
const axios = require("axios");
const { Recipe, TypeDiet } = require("./../db.js");

const API_URL = "https://api.spoonacular.com/recipes";
const { API_KEY, API_KEY2, API_KEY3 } = process.env;

const getApiRecipes = async () => {
  const apiData = await axios.get(
    `${API_URL}/complexSearch?apiKey=${API_KEY3}&addRecipeInformation=true&number=100`
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
  const apiRecipes = await getApiRecipes();
  const dbRecipes = await getDbRecipes();

  return apiRecipes.concat(dbRecipes);
};

const getRecipeById = async (res, id) => {
  //OTHER SOLUTION SEARCH INDEPENDENT DB AND API.. THINK BETTER SOLUTION!
  if (!id) return res.status(400).json({error: "Debe suministrar un ID."});
  const allRecipes = await getAllRecipes();
  const recipeById = await allRecipes.find((recipe) => recipe.id == id);
  recipeById
    ? res.status(200).json(recipeById)
    : res.status(404).json({ error: "No se encontro la receta." });
};

const addRecipe = async (req, res) => {
  const { title, summary, image } = req.body;
  if (!title || !summary) return res.status(400).json({ error: "Se necesita el titulo y la descripción de la receta." });
  const createRecipe = await Recipe.create({
    ...req.body,
    image: image || "https://ibb.co/gy1ksxp",
  });
  if (createRecipe) {
    createRecipe.addTypeDiet(req.body.diets);
    return res.json({ success: "Receta creada con exito!" });
  }

};

module.exports = {
  getRecipeById,
  getAllRecipes,
  getApiRecipes,
  getDbRecipes,
  addRecipe,
};
