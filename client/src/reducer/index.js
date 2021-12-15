const initialState = {
    recipes : [],
    diets: [],
    allRecipes: []
}


function rootReducer (state = initialState, action) {
switch (action.type){
    case 'GET_RECIPES':
    return {
        ...state,
        recipes: action.payload,     //en mi estado recipes, manda todo lo que envie la accion getrecipes
        allRecipes: action.payload
    }
    
    case 'GET_DIETS':
        return{
            ...state,
            diets: action.payload
        }
       
        case "FILTER_BY_DIET":
            const allRecipes = state.allRecipes; 
            let dietsFiltered = 
             action.payload === "All" 
                ? state.allRecipes
                : allRecipes.filter((el) => el.diets.includes(action.payload)); 
      
            return {
              ...state,
              recipes: dietsFiltered, 
            };
            case "FILTER_BY_SCORE":
                let recipesByScore =
                  action.payload === "asc" ?
                  state.recipes.sort(function (a, b) {
                  return a.score - b.score}) :

                 state.recipes.sort(function (a, b) {
                        return b.score - a.score
                      })
          
                return {
                  ...state,
                  recipes: recipesByScore,
                }
    default: 
    return state
}
}




export default rootReducer;