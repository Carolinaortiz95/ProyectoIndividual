const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

require('dotenv').config();
const {YOUR_API_KEY} = process.env;

const axios = require('axios');            //importo axios
const {Recipe, Diet} = require('../db');  //importo los modelos


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
 const apiURL = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)
 const apiInfo = await apiURL.data.results.map(e => {
            return {
                ID: e.id, 
                name: e.title,
                image: e.image,
                typeDiet: e.diets.map(el => el), 
                score : e.spoonacularScore,   
                dishTypes: e.dishTypes.map(el => el), 
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
             attributes: ['name'],
             through: {
                 attributes: [],
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



router.get('/', async (req,res) => {
 const name = req.query.name
 const recipesTotal = await getAllRecipes()

 if (name){
     let recipeName = await recipesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
     recipeName.length ?
     res.status(200).send(recipeName) : 
     res.status(404).send("La receta no existe")
 }else{
     res.status(200).send(recipesTotal)
 }
})



router.get('/types', async (req, res) =>{
const diets = [
    "gluten free",
    "dairy free",
    "paleolithic",
    "ketogenic",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "primal",
    "fodmap friendly",
    "whole 30",
]

diets.forEach(el => {
    Diet.findOrCreate({
        where: {name: el}
      })
  })

  const allTypes = await Diet.findAll()
  res.send(allTypes)
})



router.post('/recipe', async (req, res) => {
  let {name, summary, score, healthScore, steps, typeDiet, createdINBd} = req.body
  let recipeCreated = await Recipe.create({
      name, 
      summary,
      score,
      healthScore,
      steps,
      createdINBd
  })

  for (let i = 0; i < typeDiet.length; i++) {
     let diet = await Diet.findOne({
         where: {name: typeDiet[i]}
     })
      recipeCreated.addDiet(diet)
  }
  res.send("Receta creada con éxito")
})



router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const allRecipes = await getAllRecipes();
    if(id) {
        let recipeId = await allRecipes.filter(e => e.ID == id)
        recipeId.length ?
        res.status(200).json(recipeId) :
        res.status(404).send('No se encontro la receta')
    }
})


module.exports = router;