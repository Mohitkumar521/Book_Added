class Book {
    constructor(t, a, is) {
        this.title = t
        this.author = a
        this.isbn = is
    }
}

class UI {
   static displayBooks(){
   //const storeBook = [
   // {
        //title:"Title1",
        //author:"Author1",
       // isbn:1234,
   // },
   // {
       // title:"Title2",
       // author:"Author2",
        //isbn:1237,
    //},
   // {
       // title:"Title3",
       // author:"Author3",
       // isbn:1235,
    //},
   //]
   const storeBooks = Store.getBooks()
         storeBooks.forEach((book) => {
            UI.addBookToList(book)

        });
    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list")//<tbody></td>
        const row = document.createElement("tr")//<tr></tr>
        row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = '#' class= 'btn btn-danger btn-sm delete'>X</a></td>
    `
        list.appendChild(row)
    }
    static clearAllFields() {
        document.querySelector("#title").value = ''
        document.querySelector("#author").value = ''
        document.querySelector("#isbn").value = ''
    }
    static showAlert(msg, className) {
        const div = document.createElement('div')//<div></div>
        div.className = `alert alert-${className}`//<div class='alert alert-success></div>
        div.appendChild(document.createTextNode(msg))
        const form = document.querySelector("#book-form")
        const container = document.querySelector(".container")
        container.insertBefore(div, form)
        setTimeout(function () {
            document.querySelector(".alert").remove()
        }, 3000)
    }
    static deleteBook(el) {
        if (el.classList.contains("delete")){
            if (confirm("Are You Sure U want To delete this Book ?"))
                el.parentElement.parentElement.remove()
                else
                UI.showAlert("Time pass kahe kr rhe hoon")
        }
    }
}
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem("books")=== null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books;
    }
    static addBook(book){
        const books = Store.getBooks();
        books.push(book)
        localStorage.setItem("books",JSON.stringify(books))
     }
}

let book = new Book("Title 1", 'Author one', 1234)

//Event Listener
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const isbn = document.querySelector("#isbn").value
    if (title == '' || author == '' || isbn == '') {
        UI.showAlert("Please fill all the fields", "Danger")
    } else {
        const book = new Book(title, author, isbn)
        //console.log(book)
        UI.addBookToList(book)
        UI.clearAllFields()
        //alert("Book added successfully")
        UI.showAlert("Book Added Successfully", 'Success')
        Store.addBook(book)
    }
})

document.querySelector("#book-list").addEventListener("click", function (e) {
    UI.deleteBook(e.target)
})


document.addEventListener("DOMContentLoaded", UI.displayBooks)
