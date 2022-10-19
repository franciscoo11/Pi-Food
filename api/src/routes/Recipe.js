require("dotenv").config();
const { Router } = require("express");
const { Recipe } = require("./../db.js");
const { getAllRecipesOrFilterByName, getRecibeById, postRecipe, deleteRecipe } = require('../controllers/RecipeController.js')
const router = Router();


router.get('/:id', getRecibeById);
router.post('/', postRecipe);
router.get('/', getAllRecipesOrFilterByName);
router.delete('/:id', deleteRecipe);

module.exports = router;
