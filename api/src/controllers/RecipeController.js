require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("./../db.js");
const API_URL = "https://api.spoonacular.com/recipes/";
const { API_KEY, API_KEY2, API_KEY3, API_KEY4, API_KEY5, API_KEY6, API_KEY7, API_KEY8, API_KEY9, API_KEY10, API_KEY11 } = process.env;


const getApiRecipes = async () => {
  try {
    const apiRecipes = await axios.get(
      `${API_URL}complexSearch?apiKey=${API_KEY2}&addRecipeInformation=true&number=100`
    );
    const formatApiRecipes = apiRecipes.data.results.map((recipe) => {
      return {
        id: recipe.id,
        name: recipe.title,
        vegetarian: recipe.vegetarian,
        summary: recipe.summary,
        diets: recipe.diets?.map(diet => diet),
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions[0]?.steps?.map(instruction => instruction.step),
        image: recipe.image,
      };
    });
  
    return formatApiRecipes;
    
  } catch (error) {
    console.log('Something with API goes wrong..', error)
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
    console.log('Something with UNION between tables goes wrong..', error)
  }
};


const getAllRecipes = async () => {
  try {
    const apiRecipes = await getApiRecipes();
    const dbRecipes = await getDbRecipes();
    return [...apiRecipes, ...dbRecipes];
  } catch (error) {
    console.log('Something with UNION of the record between API and DB goes wrong..', error)
  }
};

// MIDDLEWARES QUE VAN A ESTAR MEDIANDO CON LAS REQUEST

const getRecibeById = async(req,res,next) => {
  try {
    const { id } = req.params;
    const allRecipes = await getAllRecipes();
    if(id){
      const findRecipe = allRecipes.find(recipe => recipe.id == id);
      findRecipe ? res.status(200).json(findRecipe) : res.status(404).json({msg: 'Recipe not found.'});
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
      return !filterByName.length ? res.status(404).json({msg: 'Recipe not matched with the name sended.'}) : res.status(200).json(filterByName);
    }
    res.status(200).json(allRecipes)
  } catch (error) {
    next(error)
  }
}

const postRecipe = async(req,res,next) => {
  try {
    const { name, summary, steps, diets, healthScore, image } = req.body;
    if(!name || !summary || !Array.isArray(diets) || diets.length === 0) return res.status(400).json({msg: 'Should be send the name, diets and summary.'})
    // diets.forEach(async (d) => {
    //   const diet = await Diet.findOne({
    //     where: { name: d},
    //   })
    //   addRecipe.addDiet(diet);
    // })
    const findDiets = await Diet.findAll({ where: {
      name: diets
    }})
    if(findDiets.length === diets.length){
      const addRecipe = await Recipe.create({ name, summary, steps, healthScore, image: image || 'https://i.ibb.co/Ykth1KM/icono-1-1.png' });
      await addRecipe.addDiet(findDiets);
      return res.status(201).json(addRecipe) //no seria mejor mandar el obj creado? {msg: 'Recipe has been created!'}
    }
    res.status(400).json({msg: 'Please enter a valid diet.'});
  } catch (error) {
    next(error)
  }
}

const deleteRecipe = async(req,res,next) => {
  try {
    const { id } = req.params;
    const findRecipeDb = await Recipe.findByPk(id);
    if(!findRecipeDb) return res.status(400).json({msg: 'ID invalid.'})

    await Recipe.destroy({
      where: { id }
    })

    res.status(200).json({msg: 'Recipe has been removed!'})
  } catch (error) {
    next(error)
  }
}

const updateRecipe = async(req,res,next) => {
  try {
    const { id } = req.params;
    const { name, summary, healthScore, steps, image, diets } = req.body;
    if( !name || !summary || !id ) res.status(400).json({msg: 'Invalid some fields are missing.'})
    const recipe = await Recipe.findOne({ where: { id: id }, });
    if(!recipe) res.status(404).json({msg: 'Recipe not found'});
    recipe.name = name || recipe.name;
    recipe.summary = summary || recipe.summary;
    recipe.healthScore = healthScore || recipe.healthScore;
    recipe.steps = steps || recipe.steps;
    recipe.image = image || recipe.image;
    if(diets.length){
      const findDiets = await Diet.findAll({ where: {
        name: diets
      }})
      recipe.setDiets(findDiets)
    }
    await recipe.save();
    res.status(204).json({msg: 'Recipe has been updated successfully!'})
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getApiRecipes,
  getAllRecipesOrFilterByName,
  getRecibeById,
  postRecipe,
  deleteRecipe,
  updateRecipe
}