import {API_URL} from './config.js';
import {getJSON} from './helpers.js'
import {async} from 'regenerator-runtime';
export const state = {
    recipe:{},
    search:{
        query:'',
        results:[]
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
        console.log(data);
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
