require("dotenv").config();
const { Router } = require("express");
const recipeRoutes = require('./Recipe');
const dietRoutes = require('./Diet')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipeRoutes); 
router.use('/diets', dietRoutes); 


module.exports = router;
