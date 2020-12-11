import View from './View';
import previewView from './previewView'
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View{
    _parentElement = document.querySelector('.bookmarks__list');
    _errorMessage= `No bookmarks yet. Find a nice recipe and bookmarked it! `;
    _succesMessage='';
    _generateMarkup(){
        //console.log(this._data)
        return  this._data.map(bookmark => previewView.render(bookmark, false)).join('')
    };


}
export default new BookmarkView();