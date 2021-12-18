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
  return {
  type: 'FILTER_BY_DIET',
  payload,
   }
}

export function postRecipe (payload){
  return async function (dispatch){
  const data = await axios.post("http://localhost:3001/recipe", payload)
  return data
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
      console.log(json.data)
      return dispatch({
          type: 'GET_NAME_RECIPES',
          payload: json.data,
        })
    } catch (error) {
      console.log(error)
      
    }
  }
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    try {  
      var json = await axios.get(`http://localhost:3001/recipes/${id}`);
      return dispatch({
        type: 'GET_DETAIL',
        payload: json.data,
      })
    } catch (error) {
     console.log(error)// return error 
    }
  }
}
