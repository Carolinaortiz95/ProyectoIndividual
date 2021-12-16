import axios from "axios";  //imp

export function getRecipes(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/recipes")
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data,

        })
    }
}

export function getDiets() {
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: 'GET_DIETS',
        payload: json.data,
      })
    }
  }

export function filterRecipesByDiet (payload){
   console.log(payload)
    return {
    type: 'FILTER_BY_DIET',
    payload,
    }

}

export function filterByName(payload) {
  return {
  type: 'FILTER_BY_NAME',
  payload,
   }
}

export function filterByScore(payload) {
  return {
  type: "FILTER_BY_SCORE",
  payload,
   }
}


export function getNameRecipes(name){
  return async function (dispatch){
    try {
      var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
      return dispatch({
          type: 'GET_NAME_RECIPES',
          payload: json.data,
        })
    } catch (error) {
      console.log(error)
      
    }
  }
}

