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
          diets: recipe.diets,
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
            diets: recipe.diets ? recipe.diets : recipe.diets.map(e => e.name),
            healthScore: recipe.healthScore,
            image: recipe.image
          }
        })
        return res.status(200).json(recipesDTO)
      }
      return res.status(404).send('Recipe not found')
  } catch (error) {
      res.status(400).send('Algo salio mal');
  }
})

router.post("/", async (req, res) => {
  const { name, summary, healthScore, steps, image, diets, fromDb } = req.body;

  try {
    const addRecipe = await Recipe.create({
      name,
      summary,
      healthScore,
      steps,
      image,
      fromDb
    });

    let dietTypesRecipeDb = await Diet.findAll({
      where: {name: diets}
    })
    addRecipe.addDiet(dietTypesRecipeDb)
    res.status(201).send('Recipe has been created!')  
  } catch (error) {
    res.status(404).send('Sorry something goes wrong.')
  };
});

router.get("/:idReceta", async (req, res) => {
  try {
    const { idReceta } = req.params;
    const foundRecipe = await getRecipeById(idReceta)
    foundRecipe ? res.status(200).json(foundRecipe) : res.status(404).send('Recipe is not found.');
  } catch (e) {
    res.status(400).send('Sorry something goes wrong..');
  }
});

module.exports = router;
