import React from "react";


export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
const pageNumers = []

for (let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
    pageNumers.push(i)   
}

return(
    <nav>
        <ul>
            {pageNumers && 
            pageNumers.map(number => (
                <li>  
            <a onClick = {() => paginado(number)}>{number}</a>
            </li>
            ))}
        </ul>
    </nav>
)

}