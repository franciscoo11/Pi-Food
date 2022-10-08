require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { Recipe, TypeDiet } = require("./../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const API_URL = "https://api.spoonacular.com/recipes";
const API_KEY = process.env.API_KEY;
const API_KEY2 = process.env.API_KEY2;
const API_KEY3 = process.env.API_KEY3;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getRecipesFromApi = async () => {
  const apiData = await axios.get(
    `${API_URL}/complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`
  );

  const apiRecipes = await apiData.data.results.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      img: recipe.image,
      typeDiets: recipe.diets.map((d) => {
        return { name: d };
      }),
      dishTypes: recipe.dishTypes.map((d) => {
        return { name: d };
      }),
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      analyzedInstructions: recipe.analyzedInstructions[0] && recipe.analyzedInstructions[0].steps ? recipe.analyzedInstructions[0].steps.map((s) => s.step).join("") : ""
    };
  });
  return apiRecipes;
};

const getDbRecipes = async () => {
  return await Recipe.findAll({
    include: {
        model: TypeDiet,
        attributes: ['name'],
        through: {
            attributes:[]
        }
    }
  })
};

const getAllRecipes = async () => {
  const apiData = await getRecipesFromApi();
  const dbData = await getDbRecipes();

  return apiData.concat(dbData);
};

router.get("/recipes", async (req, res) => {

  const { name } = req.query;
  try {

    let recipes = await getAllRecipes();
    if (!name) return res.status(200).json(recipes);
    let recipesByName = await recipes.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    return recipesByName.length
      ? res.status(200).json(recipesByName)
      : res.status(404).send("No se encontraron las recetas.");
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});


router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if(!id) return res.status(404).send('No se encontro la receta.');
    const allRecipes = await getAllRecipes();
    const recipeById = await allRecipes.find(recipe => recipe.id === id);
    return res.json(200).json(recipeById);
  } catch (error) {
    res.status(404).json({ error: message })
  }
});


module.exports = router;
