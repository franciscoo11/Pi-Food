require("dotenv").config();
const { Router } = require("express");
const recipeRoutes = require('./Recipe');
const typeDietRoutes = require('./TypeDiet');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const API_URL = "https://api.spoonacular.com/recipes";
const { API_KEY, API_KEY2, API_KEY3 } = process.env;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(recipeRoutes); 
router.use(typeDietRoutes);


module.exports = router;
