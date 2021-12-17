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
    
    case 'GET_NAME_RECIPES':
        return {
        ...state,
        recipes: action.payload
        }
    case 'GET_DIETS':
        return{
            ...state,
            diets: action.payload
        }

    case 'POST_RECIPE':
        return{
            ...state,
        }
       
        case 'FILTER_BY_DIET':
            const allRecipes = state.allRecipes 
            let dietsFiltered = 
             action.payload === "All" 
                ? state.allRecipes
                : allRecipes.filter((el) => el.diets.includes(action.payload)) 
      
            return {
              ...state,
              recipes: dietsFiltered, 
            }

        case 'FILTER_BY_NAME': 
        let orderName = action.payload === "asc" ?
         state.recipes.sort(function(a, b){
            if (a.name > b.name) {
                return 1
               }
            if (b.name > a.name) {
                 return -1
                }
                return 0

        }) :
         state.recipes.sort(function(a, b){
            if (a.name > b.name) {
                return -1
               }
            if (b.name > a.name) {
                 return 1
                }
                return 0
        })
          return {
              ...state,
              recipes: orderName
          }



        case 'FILTER_BY_SCORE':
        let orderScore =
         action.payload === "high" ?
         state.recipes.sort(function (a, b) {

          return a.score - b.score;
        }) :
         state.recipes.sort(function (a, b) {

          return b.score - a.score;
        });
      
        return {
            ...state,
            recipes: orderScore,
    };

        
      
    default: 
    return state
}

}



export default rootReducer;  


//   case "FILTER_BY_SCORE":
        //     let orderScore = action.payload === "high" ?
        //      state.recipes.sort(function(a, b){
        //         if (a.score > b.score) {
        //             return 1
        //            }
        //         if (b.score > a.score) {
        //              return -1
        //             }
        //             return 0
    
        //     }) :
        //      state.recipes.sort(function(a, b){
        //         if (a.score > b.score) {
        //             return -1
        //            }
        //         if (b.score > a.score) {
        //              return 1
        //             }
        //             return 0
        //     })
        //       return {
        //           ...state,
        //           recipes: orderScore
        //       }
    