import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecipes} from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card";


export default function Home(){
const dispatch = useDispatch()    //para utilizar la constante e ir despachando mis acciones
const allRecipes = useSelector((state) => state.recipes)  //recipes(estado en reducer) useSelector = mapstatetoprops
//con useselector traeme en esa const todo lo que esta en el estado de recipes

useEffect(()=>{
    dispatch(getRecipes())
},[dispatch])

function handleClick(e){
e.preventDefault()
dispatch(getRecipes())   //resetea 
}

return (
    <div>
<Link to= "/">CREAR RECETA</Link>
<h1>RECIPES PAGE</h1>
<button onClick = {e=>{handleClick(e)}}>  
    Volver a todas las recetas
</button>
<div>
  <select>
        <option value="asc">Ascendente</option>   {/*necesito pasarle un value para poder mandar las cosas por payload*/}
        <option value="desc">Descendente</option> {/*me permite acceder y preg el valor de las opciones, haga la logica con ese valor y lo entienda la accion  */}
  </select>
  <select>
        <option value="All">All recipes</option>
        <option value="gluten free">Gluten free</option>
        <option value="dairy free">Dairy free</option>
        <option value="paleolithic">Paleolithic</option>
        <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
        <option value="primal">Primal</option>
        <option value="vegan">Vegan</option>   
        <option value="lacto-vegetarian">Lacto-Vegetarian </option>   
        <option value="ketogenic">Ketogenic</option> 
        <option value="whole 30">Whole 30</option>  
        <option value="pescatarian">Pescatarian</option>                             
  </select>
  <select>
        <option value="all">Todas las Recetas</option>
        <option value="created">Recetas Creadas</option>
        <option value="api">Recetas Existentes</option>
  </select>
  {allRecipes?.map((el) =>{
      return(
      <fragment>
        <Link to = {"/home/" + el.id}>
          <Card name={el.name} diet={el.typeDiet} image= {el.image}/> 
        </Link>
      </fragment>
      )
      })
 }
</div>
    </div>
)
}