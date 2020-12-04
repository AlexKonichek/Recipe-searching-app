import * as model from './model';
import recipeView from './views/recipeView'


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
  } catch (error) {
    console.error(error)
  }
  
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  
}
init();