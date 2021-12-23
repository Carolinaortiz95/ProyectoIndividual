import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {postRecipe, getDiets} from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/RecipeCreate.module.css";


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
        <div className={styles.contains}> 
            <Link to = '/home'><button className={styles.buttonHome}>BACK</button></Link>
            <form className={styles.form}
             onSubmit= {(e) => handleSubmit(e)}>
                <div >
                <h1>Create your recipe!</h1>
                    <p>Recipe name:</p>
                    <input className={styles.input}
                    type = "text"
                    value = {input.name}
                    required
                    name = "name"
                    onChange = {(e) => handleChange(e)}
                    />
                    {errors.name && <p> {errors.name}</p>}

                </div>
                <div>
                    <p>Summary:</p>
                    <textarea className={styles.summary}
                    type= "text"
                    value = {input.summary}
                    required
                    name = "summary"
                    onChange = {(e) => handleChange(e)}
                    />
                     {errors.summary && <p> {errors.summary}</p>}</div>
                <div>
                <div>
                    <p>Optional Image: </p>
                    <input className={styles.input}
                    type="text" 
                    name="image"
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                    <p>Score:</p>
                    <input className={styles.input}
                    type = "number"
                    value = {input.score}
                    name = "score"
                    onChange = {(e) => handleChange(e)}
                    />
                     {errors.score && <p> {errors.score}</p>}

                </div>
                <div>
                    <p>Health Score:</p>
                    <input className={styles.input}
                    type = "number"
                    value = {input.healthScore}
                    name = "healthScore"
                    onChange = {(e) => handleChange(e)}
                    />
                     {errors.healthScore && <p> {errors.healthScore}</p>}

                </div>
                <div>
                    <p>Steps:</p>
                    <textarea className={styles.steps}
                    type = "textarea"
                    value = {input.steps}
                    name = "steps"
                    onChange = {(e) => handleChange(e)}
                    />
                </div>
                <h3>Select diets </h3>
                <select className={styles.diets}
                onChange = {(e) => handleSelect(e)}>
                    {diets.map((d) => (
                        <option value ={d.name}>{d.name}</option>
                    ))}
                </select>
                <ul><li>{input.diets.map(el => el.toUpperCase() + ", ")}</li></ul>
                {input.diets.map(el =>
                <div className={styles.subcontains}>
                    <p>{el}</p>
                    <button className={styles.buttonDelete}
                     onClick = {() => HandleDelete(el)}>X</button>
                </div>
            )}
                <button className={styles.buttonCreate}
                 type = "submit">Crate recipe</button>


            </form>
            
        </div>
    )
}

// - [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// - [ ] Botón/Opción para crear una nueva receta