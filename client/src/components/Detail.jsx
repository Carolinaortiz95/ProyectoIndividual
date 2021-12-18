import React from "react";
import {Link, useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipeDetail } from "../actions";


export default function Detail(props){
    const dispatch = useDispatch()
    const {id} = useParams()
    // const [rId, setId] = useState(id)

    useEffect(() => {
        dispatch(getRecipeDetail(id))
    },[dispatch, id])

    const myRecipe = useSelector(state => state.detail)

    // console.log(myRecipe, 'recetas')

    return(
        <div>
          
         
                <div>
                    {
                        myRecipe.length > 0 ?
                        <div>
                            <h1>{myRecipe[0].name && myRecipe[0].name}</h1>
                            <img src={myRecipe[0].image ? myRecipe[0].image :'https://st.depositphotos.com/1036708/2191/i/600/depositphotos_21918797-stock-photo-knife-and-fork-with-plate.jpg'} alt="no se encontro la imagen" />
                            <div>
                                <h5>Tipo de dieta:</h5>
                                <h2>{ myRecipe[0].diets && myRecipe[0].diets.map(t =>t.name)}</h2>
                            </div>
                            <div>
                                <h5>Puntaje:</h5>
                                <h2>{myRecipe[0].score && myRecipe[0].score}</h2>
                            </div>
                            <div>
                                <h5>Tipo de plato:</h5>
                                <h3>{myRecipe[0].dishTypes ? myRecipe[0].dishTypes.map(d => d.name) :'dish type not found'  }</h3>
                            </div>
                            <div>
                                <h5>Resumen:</h5>
                                <h3>{myRecipe[0].summary}</h3>
                            </div>
                            <div>
                                <h5>Puntaje Saludable:</h5>
                                <h2>{myRecipe[0].healthScore && myRecipe[0].healthScore }</h2>
                            </div>
                            <div>
                                <h5>Paso a Paso:</h5>
                                <h4>{ Array.isArray(myRecipe[0].steps) ? myRecipe[0].steps.map(e => e.steps.map(f => f.step)) : myRecipe[0].steps }</h4>
                            </div> 
                        </div> : <p>...Loading...</p>
                    }
                    <Link to='/home'>
                        <button>HOME</button>
                    </Link>

                </div>
            </div>
        
        
    )
}