require("dotenv").config();
const { Router } = require("express");
const { getRecipeById, getAllRecipes } = require('../controllers/RecipeController');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const API_URL = "https://api.spoonacular.com/recipes";
const { API_KEY, API_KEY2, API_KEY3 } = process.env;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get("/recipes", async (req, res) => {

  const { name } = req.query;
  try {

    let recipes = await getAllRecipes();
    if (!name) return res.status(200).json(recipes);
    let recipesByName = await recipes.filter((el) =>
      el.title.toLowerCase().includes(name.toLowerCase().trim())
    );
    return recipesByName.length
      ? res.status(200).json(recipesByName)
      : res.status(404).send({error: 'No pudimos encontrar las recetas!'});
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});


router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    getRecipeById(res,id);
  } catch (error) {
    res.send(error.message)
  }
});


module.exports = router;
