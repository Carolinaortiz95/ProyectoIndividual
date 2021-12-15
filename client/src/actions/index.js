import axios from "axios";  //imp

export function getRecipes(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001")
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data

        })
    }
}
