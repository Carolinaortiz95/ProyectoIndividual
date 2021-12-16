import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";



export default function SearchBar (){
const dispatch = useDispatch()
const [name, setName] = useState('')

function handleInputChange (e){
e.preventDefault()
setName(e.target.value)
}

function handleSubmit(e){
e.preventDefault()
dispatch(getNameRecipes(name))
}

return(
    <div>
        <input 
        type = 'text'
        placeholder = "Buscar receta..."
        onChange = {(e) => handleInputChange(e)}/>
       <button type = 'submmit' onClick = {(e) => handleSubmit(e)}>BUSCAR</button>
    </div>
)
}

