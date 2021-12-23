import React from "react";
import {Link, useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRecipeDetail } from "../actions";
import styles from "../styles/Detail.module.css"


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
        <div className={styles.contains}>
             <Link to='/home'>
                <button className={styles.button}
                >HOME</button>
              </Link>

          <div className={styles.borde}>
           { myRecipe.length > 0 ?
            <div>
               <h1 className={styles.h1}
               >{myRecipe[0].name && myRecipe[0].name}</h1>
               <img className={styles.img}
                src={myRecipe[0].image ? myRecipe[0].image :'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1492&q=80'} alt="no se encontro la imagen" />
            <div>
               <h5 className={styles.titles}>Tipe of diet:</h5>
               <h2>{ myRecipe[0].diets && myRecipe[0].diets.map(el => el.name.toUpperCase() + ", ")}</h2>
            </div>
            <div>
               <h5 className={styles.titles}>Score:</h5>
               <h2>{myRecipe[0].score && myRecipe[0].score}</h2>
            </div>
            <div>
               <h5 className={styles.titles}>Dish type:</h5>
               <h3 className={styles.dt}>{myRecipe[0].dishTypes ? myRecipe[0].dishTypes.map(d => d.name) :'Dish type not found'  }</h3>
            </div>
            <div>
               <h5 className={styles.titles}>Summary:</h5>
               <h3 className={styles.summary}> <div dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }}/></h3>
            </div>
            <div>
               <h5 className={styles.titles}>Health Score:</h5>
               <h2>{myRecipe[0].healthScore && myRecipe[0].healthScore }</h2>
            </div>
            <div>
               <h5 className={styles.titles}>Steps:</h5>
               <h4 className={styles.steps}>{ Array.isArray(myRecipe[0].steps) ? myRecipe[0].steps.map(e => e.steps.map(f => f.step)) : myRecipe[0].steps }</h4>
            </div> 
            </div> : <p>LOADING...</p>
            }
             
            </div>
            </div>
        
        
    )
}