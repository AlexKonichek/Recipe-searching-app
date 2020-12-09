import {API_URL} from './config.js';
import {getJSON} from './helpers.js'
import {RES_PER_PAGE} from './config.js'
import {async} from 'regenerator-runtime';
export const state = {
    recipe:{},
    search:{
        query:'',
        results:[],
        page:1,
        resultsPerPage: RES_PER_PAGE
        
    }
}
export const loadRecipe = async function (id) {
    try{
    const data = await getJSON(`${API_URL}${id}`);
  
    let {recipe} = data.data;
    state.recipe = {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients
    }
    }catch(err) {
        console.log(err)
        throw err;
    }
    
}

export const loadSearchResult = async function (query) {
    try {
        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(state.recipe);
        state.search.query = query;
        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        })
        console.log(state.search)
    } catch (err) {
        console.log(err)
        throw err;
    }
}
export const controlSearchResultsPage = function(page=state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page  * state.search.resultsPerPage;
    return state.search.results.slice(start, end)
}

  export const updateServings = function (newServings) {
    
      console.log(state.recipe.ingredients[2].quantity)
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings) /state.recipe.servings;
        
    });
    state.recipe.servings = newServings;
    console.log(state.recipe.ingredients[2].quantity)
}