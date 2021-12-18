import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postRecipe, getDiets} from "../actions/index";
import { useDispatch, useSelector } from "react-redux";


function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "The name of recipe is required";
    } else if (!input.summary) {
      errors.summary = "Summary is required";
    } else if (input.score > 100) {
      errors.score = "The score has to be lower than 100";
    } else if (input.healthScore > 100) {
      errors.healthScore = "The healt has to be lower than 100";
    }
    return errors;
  }

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
    const [errors, setError] = useState({})

    const [input, setInput] = useState({
        name: "", 
        summary: "",
        image: "",
        score: 0,
        healthScore: 0,
        steps: "",
        diets: [],
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [])


    function HandleDelete(el){
     setInput({
         ...input,
         diets: input.diets.filter(d => d !== el)
     })

    }


    function handleChange(e){
     setInput({
         ...input,
         [e.target.name] : e.target.value
     })
     setError(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } 

    function handleSelect(e){
        setInput({
         ...input,
         diets: [...input.diets, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(input)
        dispatch(postRecipe(input))
        alert('Receta creada con éxito')
        setInput({
            name: "", 
            summary: "",
            image: "",
            score: 0,
            healthScore: 0,
            steps: "",
            diet: [],

        })
        history.push('/home')
    }

    return(
        <div>
            <Link to = '/home'><button>VOLVER</button></Link>
            <h1>Crea tu receta!</h1>
            <form onSubmit= {(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                    type = "text"
                    value = {input.name}
                    required
                    name = "name"
                    onChange = {(e) => handleChange(e)}
                    />
                    {errors.name && <p> {errors.name}</p>}

                </div>
                <div>
                    <label>Summary:</label>
                    <input
                    type= "text"
                    value = {input.summary}
                    required
                    name = "summary"
                    onChange = {(e) => handleChange(e)}
                    />
                     {errors.summary && <p> {errors.summary}</p>}</div>
                <div>
                <div>
                    <label>Optional Image: </label>
                    <input
                    type="text" 
                    name="image"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                    <label>Score:</label>
                    <input 
                    type = "number"
                    value = {input.score}
                    name = "score"
                    onChange = {(e) => handleChange(e)}
                    />
                     {errors.score && <p> {errors.score}</p>}

                </div>
                <div>
                    <label>Health Score:</label>
                    <input 
                    type = "number"
                    value = {input.healthScore}
                    name = "healthScore"
                    onChange = {(e) => handleChange(e)}
                    />
                     {errors.healthScore && <p> {errors.healthScore}</p>}

                </div>
                <div>
                    <label>Steps:</label>
                    <input 
                    type = "text"
                    value = {input.steps}
                    name = "steps"
                    onChange = {(e) => handleChange(e)}
                    />
                </div>
                <h3>Select diets </h3>
                <select onChange = {(e) => handleSelect(e)}>
                    {diets.map((d) => (
                        <option value ={d.name}>{d.name}</option>
                    ))}
                </select>
                <ul><li>{input.diets.map(el => el + ", ")}</li></ul>
                <button type = "submit">Crar receta</button>
            </form>
            {input.diets.map(el =>
                <div>
                    <p>{el}</p>
                    <button onClick = {() => HandleDelete(el)}>x</button>
                </div>
            )}
        </div>
    )
}

// - [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// - [ ] Botón/Opción para crear una nueva receta