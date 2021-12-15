import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterRecipesByDiet, getRecipes} from "../actions";
import {Link} from "react-router-dom"
import Card from "./Card";
import Paginado from "./Paginate";


export default function Home(){
const dispatch = useDispatch()    //para utilizar la constante e ir despachando mis acciones
const allRecipes = useSelector((state) => state.recipes)  //recipes(estado en reducer) useSelector = mapstatetoprops
const [currentPage, setCurrentPage] = useState(1) //con useselector traeme en esa const todo lo que esta en el estado de recipes
const [recipesPerPage, setRecipesPerPage] = useState(9)
const iOfLastRecipe = currentPage * recipesPerPage
const iOfFirstRecipe = iOfLastRecipe - recipesPerPage
const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe)

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)
}


useEffect(()=>{
    dispatch(getRecipes())
},[dispatch])

function handleClick(e){
e.preventDefault()
dispatch(getRecipes())   //resetea 
}

function handleDiets(e) {
  e.preventDefault()
  dispatch(filterRecipesByDiet(e.target.value));
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
        <option value="desc"> High score </option>
        <option value="asc"> Low score </option>
      </select>
  <select onChange={(e) => handleDiets(e)}>
        <option value="All"> All diets</option>
        <option value="gluten free"> Gluten free</option>
        <option value="dairy free"> Dairy free</option>
        <option value="paleolithic"> Paleolithic</option>
        <option value="ketogenic"> Ketogenic</option>
        <option value="lacto ovo vegetarian"> Lacto ovo vegetarian</option>
        <option value="vegan"> Vegan</option>
        <option value="pescatarian"> Pescatarian</option>
        <option value="primal"> Primal</option>
        <option value="fodmap friendly"> Fodmap friendly</option>
        <option value="whole 30"> Whole 30</option>
      </select>
  <select>
        <option value="all">Todas las Recetas</option>
        <option value="created">Recetas Creadas</option>
        <option value="api">Recetas Existentes</option>
  </select>
 <Paginado
 recipesPerPage = {recipesPerPage} 
 allRecipes = {allRecipes.length}
 paginado = {paginado}
 />
  {currentRecipes?.map((el) =>{
      return(
      <div>
        <Link to = {"/home/" + el.id}>
          <Card name={el.name} diet={el.diets} image= {el.image}/> 
        </Link>
      </div>
      )
      })
 }
</div>
    </div>
)
}