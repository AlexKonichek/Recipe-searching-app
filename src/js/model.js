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
    },
    bookmarks:[]
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

    if(state.bookmarks.some(bookmark => bookmark.id === id)){
        state.recipe.bookmarked = true
    }else{
        state.recipe.bookmarked = false

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
        state.search.page = 1;
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

 export const addBookmark = function(recipe) {
     this.state.bookmarks.push(recipe);
     
     if(recipe.id === state.recipe.id) {
         state.recipe.bookmarked = true;
     }
 }

 export const deleteBookmark = function(id){
     const index = state.bookmarks.findIndex(bookmark => bookmark.id===id)
     state.bookmarks.splice(index, 1);
     if(id === state.recipe.id) {
        state.recipe.bookmarked = false;
    }

 }