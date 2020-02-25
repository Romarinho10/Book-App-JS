class BookService{

    constructor(){
        this.URI = '/api/books';
    }

    async getBooks(){
        const response = await fetch(this.URI);  //por defecto Fetch hace peticion GET
        //conversion de dato crudo a json
        const books = await response.json();
        return books;
    }
    
    async postBooks(book){
        const res  = await fetch(this.URI, {
            //cabeceras informacion extra para decirle al backend que le estoy enviando
            method: 'POST',
            body: book
        });

        const data =  await res.json();
        //return data;
        console.log(data);
    }

    async deleteBooks(bookId){
        const res = await fetch(`${this.URI}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json' //exlusivo para datos (no imagenes)
            },
            method: 'DELETE'
        });

        const data = await res.json();
        console.log(data);
        
    }


}

export default BookService;