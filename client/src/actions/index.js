import axios from "axios";  //imp

export function getRecipes(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001")
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
        type: "GET_DIETS",
        payload: json.data,
      });
    };
  }

export function filterRecipesByDiet (payload){
   console.log(payload)
    return {
    type: "FILTER_BY_DIET",
    payload,
    }

}

export function filterByScore(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_SCORE",
    payload,
  };
}

