import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postRecipe, getDiets} from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)

    const [input, setInput] = useState({
        name: "", 
        summary: "",
        score: 0,
        healthScore: 0,
        steps: "",
        diets: [],
    })

    useEffect(() => {
        dispatch(getDiets())
    }, [])

    function handleChange(e){
     setInput({
         ...input,
         [e.target.name] : e.target.value
     })
     console.log(input)
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
                    name = "name"
                    onChange = {(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Summary:</label>
                    <input
                    type= "text"
                    value = {input.summary}
                    name = "summary"
                    onChange = {(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Score:</label>
                    <input 
                    type = "number"
                    value = {input.score}
                    name = "score"
                    onChange = {(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Health Score:</label>
                    <input 
                    type = "number"
                    value = {input.healthScore}
                    name = "healthScore"
                    onChange = {(e) => handleChange(e)}
                    />
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
        </div>
    )
}

// - [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// - [ ] Botón/Opción para crear una nueva receta