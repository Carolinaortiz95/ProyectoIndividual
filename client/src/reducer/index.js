const initialState = {
    recipes : []
}


function rootReducer (state = initialState, action) {
switch (action.type){
    case 'GET_RECIPES':
    return {
        ...state,
        recipes: action.payload     //en mi estado recipes, manda todo lo que envie la accion getrecipes
    }
    default: 
    return state
}
}

export default rootReducer;