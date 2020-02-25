import BookService from './services/BookService';
const bookService = new BookService();

import {format} from 'timeago.js';



//clase encargada de interactuar con el DOM
class UI{

    async renderBook(){
        const books= await bookService.getBooks();
        //console.log(books);
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
            <div class='card m-2'>
            <div class='row'>
            <div class='col-md-4'>
            <img src='${book.imagePath}' alt='' class='img-fluid'/>
            </div>
            <div class='col-md-8'>
            <div class='card-block px-2'>
            <h4 class='card-block px-2'>${book.title}</h4>
            <p class='card-text'>${book.author}</p>
            <a href='#' class='btn btn-danger delete' _id='${book._id}'>X</a>
            </div>
            </div>
            </div>
            <div class='card-footer'>
            ${format(book.created_at)}
            </div>
            </div>
            `;
            booksCardContainer.appendChild(div);
        });
    }

    async addNewBook(book){
        await bookService.postBooks(book);
        this.clearBookForm();
        this.renderBook();
    }

    clearBookForm(){
        document.getElementById('book-form').reset();
    }

    async deleteBook(bookId){
        await bookService.deleteBooks(bookId);
        this.renderBook();
    }

    renderMessage(message, colorMessage, secondsToRemove){
        const div = document.createElement ('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4'); //seleccion por clase
        const bookForm = document.querySelector('#book-form'); //seleccion por id

        container.insertBefore(div, bookForm);
        setTimeout(()=>{
            document.querySelector('.message').remove();
        }, secondsToRemove);
    }

}

export default UI;