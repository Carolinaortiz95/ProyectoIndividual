const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

require('dotenv').config();
const { YOUR_API_KEY } = process.env;

const axios = require('axios');            //importo axios
const { Recipe, Diet } = require('../db');  //importo los modelos


const router = Router();

const recipesRouter = require('./recipes.js')
const recipeRouter = require('./recipe.js')
const typesRouter = require('./types.js')

router.use('/recipes', recipesRouter)
router.use('/recipe', recipeRouter)
router.use('/types', typesRouter)



module.exports = router;