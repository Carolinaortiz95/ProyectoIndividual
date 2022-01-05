const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

require('dotenv').config();
const { YOUR_API_KEY } = process.env;

const axios = require('axios');            //importo axios
const { Recipe, Diet } = require('../db');  //importo los modelos


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)

    const apiInfo = apiURL.data.results.map(e => {   //INGRESO AL .DATA -> traigo solo lo que necesito
        return {
            ID: e.id,                         
            name: e.title,
            image: e.image,
            score: e.spoonacularScore,
            dishTypes: e.dishTypes.map((d) => { return { name: d } }),    //es un arreglo, utilizo el map para que me devuelva todos
            diets: e.diets.map((d) => { return { name: d } }),
            summary: e.summary,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions
        }
    })
    return apiInfo   //me traigo la info de la api
}

const getDbInfo = async () => {

    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],  //include el modelo Diet para que se genere la relacion 
            through: {
                attributes: [],   //mediente los atributos ->  me traeria todos en caso de que fueran más sin la comprobacion through
            },
        }
    })
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const infoTotal = apiInfo.concat(dbInfo)

    return infoTotal
}



router.get('/', async (req, res) => {
    const name = req.query.name    // por nombre 
    const recipesTotal = await getAllRecipes()
  
    if (name) {
        let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))  //si incluye el nombre que viene por query
        recipeName.length ?
            res.status(200).send(recipeName) :
            res.status(404).send("La receta no existe")
    } else {
        res.status(200).send(recipesTotal)
    }
})



router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const allRecipes = await getAllRecipes();    //vuelvo a utilizar la funcion
    if (id) {
        let recipeId = await allRecipes.filter(e => e.ID == id)   //filtro el id que llega por params
        recipeId.length ?
            res.status(200).json(recipeId) :
            res.status(404).send('No se encontro la receta')
    }
})

// router.get('/:id', async (req, res) => {
//     const id = req.params.id;
//     try {
//         const allRecipes = await getAllRecipes()
//         let recipeId = await allRecipes.filter(e => e.ID == id)
//         if(!recipeId){
//             throw new Error
//         }
//         res.status(200).json(recipeId)

//     } catch (error) {
//         res.status(404).send('No se encontro la receta')
//     }
// })

module.exports = router;