require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("./../db.js");
const API_URL = "https://api.spoonacular.com/recipes/";
const { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7, API_KEY8 } = process.env;


const getApiRecipes = async () => {
  try {
    const apiRecipes = await axios.get(
      `${API_URL}complexSearch?apiKey=${API_KEY4}&addRecipeInformation=true&number=100`
    );
    const formatApiRecipes = await apiRecipes.data.results.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        diets: recipe.diets?.map(diet => diet),
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions[0]?.steps?.map(instruction => instruction.step),
        image: recipe.image,
      };
    });
  
    return formatApiRecipes;
    
  } catch (error) {
    console.log('La pegada a la API no respondio..', error)
  }
};

const getDbRecipes = async () => {
  try {
    const dbRecipes = await Recipe.findAll({
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        }
      },
    });

    return dbRecipes
  } catch (error) {
    console.log('La union con las dos tablas salio mal', error)
  }
};

const getAllRecipes = async () => {
  try {
    const apiRecipes = await getApiRecipes();
    const dbRecipes = await getDbRecipes();
    return [...apiRecipes, ...dbRecipes];
  } catch (error) {
    console.log('La concatenación con la info de la API y mi DB salio mal..', error)
  }
};

// MIDDLEWARES QUE VAN A ESTAR MEDIANDO CON LAS REQUEST

const getRecibeById = async(req,res,next) => {
  try {
    const { id } = req.params;
    const allRecipes = await getAllRecipes(id);
    if(id){
      const findRecipe = allRecipes.find(recipe => recipe.id == id);
      findRecipe ? res.status(200).send(findRecipe) : res.status(404).json({msg: 'Recipe not found.'});
    }
  } catch (error) {
    next(error)
  }
}

const getAllRecipesOrFilterByName = async (req,res,next) => {
  try {
    const { name } = req.query;
    const allRecipes = await getAllRecipes();
    if(name){
      const filterByName = allRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase().trim()));
      return filterByName.length ? res.status(200).json(filterByName) : res.status(404).json({msg: 'Recipe not found.'})
    }
    res.status(200).json(allRecipes)
  } catch (error) {
    next(error)
  }
}

const postRecipe = async(req,res,next) => {
  try {
    const { name, summary, steps, diets, healthScore } = req.body;
    const addRecipe = await Recipe.create({name, summary, healthScore, steps });
    const findDiets = await Diet.findAll({ where: {
      name: diets
    }})

    await addRecipe.addDiet(findDiets)
    return res.status(201).json(addRecipe) //no seria mejor mandar el obj creado? {msg: 'Recipe has been created!'}
  } catch (error) {
    next(error)
  }
}


module.exports = {
  getApiRecipes,
  getAllRecipesOrFilterByName,
  getRecibeById,
  postRecipe
}