import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../actions";
import style from "./searchBar.module.css";



export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)   //valor del input
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNameRecipes(name)) //el estado
        setName('')
        
    }

    return (
        <div className={style.contains}>
            <input className={style.input}
                value = {name}
                type='text'
                placeholder="Recipe..."
                onChange={(e) => handleInputChange(e)}
            />
            <button className={style.btnSearch}
                type='submit' onClick={(e) => handleSubmit(e)} >Search</button>

        </div>
    )
}

