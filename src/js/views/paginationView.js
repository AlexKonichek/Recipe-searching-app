import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addClickHandler(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline')
            if(!btn) return;
            const gotoPage = +btn.dataset.goto;
            console.log(e.target, gotoPage);
            handler(gotoPage);
        })
    }
    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length/this._data.resultsPerPage);
        console.log(numPages)

        //page 1 and there are other pages
            if(curPage === 1 && numPages>1){
                return 
                `<button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
                <span>${curPage+1} next</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </button>`;
            }
        
          
        //other pages
        if(this._data.page < numPages ){
            return ` 
            <button data-goto="${curPage-1}"class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
            <span>prev ${curPage-1}</span>
            </button>
            <button data-goto="${curPage+1}" class="btn--inline pagination__btn--next">
                <span>${curPage+1} next</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>` ;
        }
        // last page
        if(this._data.page === numPages && numPages>1 ){
            return `
            <button data-goto="${curPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>prev ${numPages-1}</span>
          </button>
          ` ;
        }
        //page 1 and there is no other pages
         return '';
    }
}
export default new PaginationView();