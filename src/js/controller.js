import { async } from 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resulstView from './views/resultsView';

if(module.hot){
  module.hot.accept();
}



const recipeContainer = document.querySelector('.recipe');



const controlRecipes = async function () {
  try {
  const id = window.location.hash.slice(1);
  if (!id) {
    return
  }
  
  recipeView.renderSpiner();

    //loading recipe
  await model.loadRecipe(id);
   
  //rendering recipe
  recipeView.render(model.state.recipe);
  } catch (err) {
    
    recipeView.renderError();
  }
  
};

const controlSearchResults = async function () {
  try {
    resulstView.renderSpiner();

    const query = searchView.getQuery();

    if(!query)return;
    await model.loadSearchResult(query);
    //console.log(model.state.search.results);
    resulstView.render(model.state.search.results);
  } catch (error) {
    console.log(error)
  }
}



const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  
}
init();