import { async } from 'regenerator-runtime';
import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resulstView from './views/resultsView';
import paginationView from './views/paginationView'
import resultsView from './views/resultsView';

const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async function () {
  try {
  const id = window.location.hash.slice(1);
  if (!id) {
    return
  }
  
  recipeView.renderSpiner();
  //update results view to mark selected search result
  resulstView.update(model.controlSearchResultsPage())

    //loading recipe
  await model.loadRecipe(id);
   
  //rendering recipe
  recipeView.render(model.state.recipe);
  //console.log(model.state.recipe)
  
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
    
    resulstView.render(model.controlSearchResultsPage(4));
    paginationView.render(model.state.search);


  } catch (error) {
    console.log(error)
  };
}
const controlServings = (newServings) => {
  //update recipe servings in state
model.updateServings(newServings);

  //update recipe view
  recipeView.update(model.state.recipe);

};


const paginationController = (goToPage) => {
  //console.log(goToPage)
  //render new results
  resultsView.render(model.controlSearchResultsPage(goToPage));
  // render new pagination buttons
  paginationView.render(model.state.search)
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addClickHandler(paginationController);
  
  
}
init();