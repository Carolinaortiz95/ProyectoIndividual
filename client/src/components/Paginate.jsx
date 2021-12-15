import React from "react";


export default function Paginado ({recipesPerPage, allRecipes, paginado}) {
const pageNumers = []

for (let i = 0; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
    pageNumers.push(i+1)   
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