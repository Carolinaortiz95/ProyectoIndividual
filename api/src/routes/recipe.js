const { Router } = require('express');
const { Recipe, Diet } = require('../db');  //importo los modelos


const router = Router();

router.post('/', async (req, res) => {
    // console.log("NO CREA", req.body)
    let { name, summary, score, healthScore, steps, diets, image, createdINBd } = req.body
    let recipeCreated = await Recipe.create({   
        name,
        summary,
        score,
        healthScore,
        steps,
        image,
        createdINBd                         
    })

    for (let i = 0; i < diets.length; i++) {   //la ocupacion debo encontrarla en el modelo
        let diet = await Diet.findOne({       //encontrar la dieta en el modelo Diet
            where: { name: diets[i] }        //todas las que coincidan con el nombre que llega por body
        })
        recipeCreated.addDiet(diet)        //metodo de sql
    }
    res.send("Receta creada con éxito")
})

module.exports = router;