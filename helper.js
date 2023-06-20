//@ts-check
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';


//defines javascript type definition using JSDoc syntax -describes properties of an object called bookPreviewElements
/**
 * @typedef {Object} BookPreviewProperties 
 * @prop {HTMLDialogElement} overlay //used as an overlay/modal dialog that appears on top of main content
 * @prop {HTMLImageElement} image //image element that displays book's image
 * @prop {HTMLHeadElement} title //h3 element that displays book's title
 * @prop {HTMLDivElement} subtitle //div element that contains book's author
 * @prop {HTMLParagraphElement} description //p element that contains book's description
 * @prop {HTMLButtonElement} close //button element that closes overlay
 * 
 */

//defines helper function createBookElement to create preview
export function createBookElement(book) { 
    const { author, id, image, title } = book; //uses destructuring to extract data from book object
    const element = document.createElement('div');//creates new div element using createElement methof of document object. Element will serve as container for book's information
    element.classList.add('book'); //adds css class name 'book' to created element
    element.dataset.book = id; //sets data attribute 'book' to book's id
    //sets innerHTML of element to contain book's information
    //creates image element and sets src and alt attributes to book's image
    //creates div element and sets innerHTML to contain book's title and author
    //appends image and div elements to element
    //returns element to be appended to bookList div element
    element.innerHTML = `
    <img src="${image}" alt="${title}" /> 
    <div class="smallText">
        <h3>${title}</h3>
        <p>${author}</p>
    </div>`;
    return element;
}

//playing around with encapsulation
export function updateBookList (books, bookList) {
    bookList.innerHTML = '';
    books.forEach(book => {
        const bookElement = createBookElement(book);
        bookList.appendChild(bookElement);
    });
}

export function applyTheme (theme) {
    document.documentElement.className = theme;
}
