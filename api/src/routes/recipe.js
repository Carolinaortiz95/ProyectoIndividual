const { Router } = require('express');
const { Recipe, Diet } = require('../db');  //importo los modelos


const router = Router();

router.post('/', async (req, res) => {
    console.log("NO CREA", req.body)
    let { name, summary, score, healthScore, steps, diets, createdINBd } = req.body
    let recipeCreated = await Recipe.create({
        name,
        summary,
        score,
        healthScore,
        steps,
        createdINBd
    })

    for (let i = 0; i < diets.length; i++) {
        let diet = await Diet.findOne({
            where: { name: diets[i] }
        })
        recipeCreated.addDiet(diet)
    }
    res.send("Receta creada con éxito")
})

module.exports = router;