import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipesByDiet, getRecipes, filterByName, filterByScore } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/card";
import Paginado from "../Paginate/paginate";
import SearchBar from "../SearchBar/searchBar";
import style from "./home.module.css";


export default function Home() {
  const dispatch = useDispatch()    //para utilizar la constante e ir despachando mis acciones
  const allRecipes = useSelector((state) => state.recipes)  //recipes(estado en reducer) useSelector = mapstatetoprops
  const [currentPage, setCurrentPage] = useState(1) //con useselector traeme en esa const todo lo que esta en el estado de recipes
  const [orden, setOrden] = useState('')
  const [orden1, setOrden1] = useState('')
  const [recipesPerPage, setRecipesPerPage] = useState(9)
  const iOfLastRecipe = currentPage * recipesPerPage
  const iOfFirstRecipe = iOfLastRecipe - recipesPerPage
  const currentRecipes = allRecipes.slice(iOfFirstRecipe, iOfLastRecipe)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault()
    dispatch(getRecipes())   //resetea 
  }

  function handleDiets(e) {
    e.preventDefault()
    dispatch(filterRecipesByDiet(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault()
    dispatch(filterByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
  }


  function handleOrderByScore(e) {
    e.preventDefault()
    dispatch(filterByScore(e.target.value))
    setCurrentPage(1)
    setOrden1(`Ordenado ${e.target.value}`)
  }




  return (

    <div className={style.container}>

      <Link className={style.button2}
        to="/recipe">CREATE RECIPE</Link>
      <div>
        <h1 className={style.page}
        >RECIPE'S PAGE</h1>
      </div>

      <div className={style.bordercont}>

        <SearchBar />
        <select className={style.select}
          onChange={(e) => handleOrderByName(e)}>
          <option value="asc">A to Z</option>   {/*necesito pasarle un value para poder mandar las cosas por payload*/}
          <option value="desc">Z to A</option> {/*me permite acceder y preg el valor de las opciones, haga la logica con ese valor y lo entienda la accion  */}
        </select>
        <select className={style.select}
          onChange={(e) => handleOrderByScore(e)}>
          <option value="high"> High score </option>
          <option value="low"> Low score </option>
        </select>
        <select className={style.select}
          onChange={(e) => handleDiets(e)}>
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
        <button className={style.button}
          onClick={e => { handleClick(e) }}>
          BACK TO ALL RECIPES
        </button>


        <div className={style.cards}>
          {currentRecipes?.map((el) => {
            return (
              <Link className={style.link}
                to={`recipes/${el.ID}`}>
                <Card key={el.ID} id={el.ID} name={el.name} diet={el.diets} image={el.image ? el.image : <img src='https://image.shutterstock.com/image-photo/notepad-your-recipe-herbs-spices-260nw-370298699.jpg' />} />
              </Link>

            )
          })
          }
        </div>
        <Paginado
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
    </div>
  )
}