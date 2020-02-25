import './styles/app.css';

import UI from './UI';
 
document.addEventListener('DOMContentLoaded', ()=>{
    const ui = new UI();
    ui.renderBook();
});

document.getElementById('book-form').addEventListener('submit', e =>{
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const image = document.getElementById('image').files;

    //form virtual
    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    const ui = new UI();
    ui.addNewBook(formData);

    //una vez guardado el dato mostramos por pantalla
    ui.renderMessage('New Book Added', 'success', 3000);
    
    e.preventDefault();
});


document.getElementById('books-cards').addEventListener('click', e =>{
    //console.log('click');
    if (e.target.classList.contains('delete')){
       // console.log(e.target.getAttribute('_id'));
       const ui = new UI();
       ui.deleteBook(e.target.getAttribute('_id'));
       //una vez guardado el dato mostramos por pantalla
       ui.renderMessage('Book Removed', 'danger', 3000);
    }
    e.preventDefault();
    
});