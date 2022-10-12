require("dotenv").config();
const { Router } = require("express");
const { Recipe, Diet, Op } = require("./../db.js");
const { getAllRecipes, getRecipeById } = require('../controllers/RecipeController.js')
const router = Router();


// const mapEntityToObj = (recipe) => {   // HAGO UN PASAMANO CON UN OBJ CON LA INFORMACION QUE QUIERO QUE VIAJE
//   return {
//     id: recipe.id,
//     name: recipe.name,
//     summary: recipe.summary,
//     healthScore: recipe.healthScore,
//     steps: recipe.steps,
//     diets: recipe.diets.map((diet) => diet.name),
//   };
// };


router.get('/', async(req,res) => {
  try {
    const { name } = req.query;
    const allRecipes = await getAllRecipes();
    if(!name){
      let recipes = allRecipes.map(recipe => {
        return {
          id: recipe.id,
          name: recipe.name,
          dietTypes: recipe.dietTypes
            ? recipe.dietTypes
            : recipe.diets.map((e) => e.name),
          healthScore: recipe.healthScore,
          image: recipe.image,
        };
      })
      return res.status(200).json(recipes)
    }
    let filterByName = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase().trim()));
      if(filterByName.length){
        let recipesDTO = filterByName.map(recipe => {
          return {
            id: recipe.id,
            name: recipe.name,
            dietTypes: recipe.dietTypes ? recipe.dietTypes : recipe.diets.map(e => e.name),
            healthScore: recipe.healthScore,
            image: recipe.image
          }
        })
        return res.status(200).json(recipesDTO)
      }
      return res.status(404).send('Recipe not found')
  } catch (error) {
      // res.status(400).send('Algo salio mal');
      console.log(error)
  }
})

router.post("/", async (req, res, next) => {
  const {  name, summary, healthScore, steps, image, dietTypes } = req.body;

  try {
    const addRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      steps,
      image
    });

    let dietTypesRecipeDb = await Diet.findAll({
      where: {name: dietTypes}
    })
    addRecipe.addDiet(dietTypesRecipeDb)
    res.status(200).send(addRecipe)  
  } catch (error) {
    next(error)
  };
});

router.get("/:idReceta", async (req, res) => {
  try {
    const { idReceta } = req.params;
    const foundRecipe = await getRecipeById(idReceta)
    foundRecipe ? res.status(200).json(foundRecipe) : res.status(404).send('Recipe is not found.');
  } catch (e) {
    res.status(400).send('Something goes wrong..');
  }
});

module.exports = router;
