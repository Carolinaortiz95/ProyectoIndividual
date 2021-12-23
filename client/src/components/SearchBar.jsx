import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";
import styles from "../styles/SearchBar.module.css";



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
    <div className={styles.contains}>
        <input className= {styles.input} 
        type = 'text'
        placeholder = "Recipe..."
        onChange = {(e) => handleInputChange(e)}
        />
       <button className={styles.btnSearch}
        type = 'submmit' onClick = {(e) => handleSubmit(e)}>Search</button>
        
    </div>
)
}

