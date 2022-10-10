const { Router } = require("express");
const {
  getAllRecipes,
  getRecipeById,
  addRecipe,
} = require("../controllers/RecipeController");

const router = Router();

router.get("/recipes", async (req, res) => {
  try {
    const { name } = req.query;
    const totalRecipes = await getAllRecipes();
    if (!name) return res.status(200).json(totalRecipes);
    let recipesByName = await totalRecipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(name.toLowerCase())
    );
    return recipesByName.length
      ? res.status(200).json(recipesByName)
      : res.status(404).json({ error: "No pudimos encontrar las recetas!" });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Lo sentimos en este momento no pudimos traer las recetas..",
      });
  }
});

router.post("/recipes", async (req, res) => {
  try {
    addRecipe(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Lo sentimos pero algo salio mal y no pudimos terminar de crear la receta.' });
  }
});

router.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    getRecipeById(res, id);
  } catch (error) {
    res.status(500).json({ error: 'No pudimos acceder a la receta solicitada.' });
  }
});

module.exports = router;
