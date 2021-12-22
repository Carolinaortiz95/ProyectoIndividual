import React from "react";
import styles from "../styles/Paginate.module.css";


export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
const pageNumers = []

for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
    pageNumers.push(i)   
}

return(
    <nav>
        <ul className={styles.paginado}>
            {pageNumers && 
            pageNumers.map(number => (
                <li className={styles.li}>  
            <button className={styles.button} onClick = {() => paginado(number)}>{number}</button>
            </li>
            ))}
        </ul>
     </nav>
    
)

}