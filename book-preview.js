import { books, authors } from './data'
import { html } from './helper'

//class definition for custom element called BookPreview
export class BookPreview extends HTMLElement { //BookPreview class extends HTMLElement class
    constructor() { //constructor method
        super() //call super class constructor method
        
        this.attachShadow({ mode: 'open' }) //attach shadow DOM to BookPreview class
    //this.shadowRoot.innerHTML assignment used to set HTML content of shadow root
        this.shadowRoot.innerHTML = `  
            <style>                 
            .preview {
                border-width: 0;
                width: 100%;
                font-family: Roboto, sans-serif;
                padding: 0.5rem 1rem;
                display: flex;
                align-items: center;
                cursor: pointer;
                text-align: left;
                border-radius: 8px;
                border: 1px solid rgba(var(--color-dark), 0.15);
                background: rgba(var(--color-light), 1);
              }

              @media (min-width: 60rem) {
                .preview {
                  padding: 1rem;
                }
              }
              
              .preview_hidden {
                display: none;
              }
              
              .preview:hover {
                background: rgba(var(--color-blue), 0.05);
              }
              
              .preview__image {
                width: 48px;
                height: 70px;
                object-fit: cover;
                background: grey;
                border-radius: 2px;
                box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
                  0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
              }
              
              .preview__info {
                padding: 1rem;
              }
              
              .preview__title {
                margin: 0 0 0.5rem;
                font-weight: bold;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;  
                overflow: hidden;
                color: rgba(var(--color-dark), 0.8)
              }
              
              .preview__author {
                color: rgba(var(--color-dark), 0.4);
              }
            
              </style>
              `
    }
  
    connectedCallback() { //continues BookPreview class definition and adds the connectedCallback method
      const bookId = this.getAttribute('book-id') //retrieves value of book-id attribute from BookPreview class

      const book = books[bookId] //sets book variable to value of bookId key in books object

      //check if book objects exists
      if (book) {
        this.shadowRoot.querySelector('.preview').addEventListener('click', () => { //attatches click event listener to element with class name .preview within the shadow DOM of bookPreview element
            html.bookPreview.overlay.show() //Calls the show() method on the overlay property to display the book preview overlay.
            html.bookPreview.Image.src = book.image //Updates the src property of the Image property to set the book image.
            html.bookPreview.Blur.src = book.image //Updates the src property of the Blur property to set the blurred book image.
            html.bookPreview.Title.textContent = book.title //Updates the Title property of the bookPreview element to set the book title.
            html.bookPreview.Subtitle.textContent = book.subtitle //Updates the Subtitle property of the bookPreview element to set the book subtitle.
            html.bookPreview.description.textContent = book.description //Updates the description property of the bookPreview element to set the book description.
        
        this.shadowRoot.querySelector('.preview_image').src = book.image //Updates src property of element with class name .preview_image within shadow DOM. Sets src value to book.image value
        this.shadowRoot.querySelector('.preview_title').textContent = book.title //Updates text content of element with class name .preview_title within shadow DOM. Sets text content to book.title value
        this.shadowRoot.querySelector('.preview_author').textContent = book.author //Updates text content of element with class name .preview_author within shadow DOM. Sets text content to book.author value
      })
    }
      }
  
    //defines book-preview custom element and dynamically creates and appends multiple instances of book-preview element to <body> of HTML document based on the books object
    customElements.define('book-preview', BookPreview) //registers custom element called book-preview and associates it with bookPreview class to allow dev to use <book-preview> tag in HTML markup

    for (const bookId in books) { //loop iterates over books object using bookId as loop variable
      const bookPreview = document.createElement('book-preview')//creates new instance of book-preview element
      bookPreview.setAttribute('book-id', bookId) //sets book-id attribute of bookPreview element to value of bookId key in books object
      document.body.appendChild(bookPreview) //appends bookPreview element to <body> of HTML document
    
    }
  
  }
