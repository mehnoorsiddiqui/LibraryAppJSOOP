class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
  //we will pass an object to add method
  add(book) {
    let tableBody = document.getElementById("tableBody");
    let uiString = `
             <tr>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.type}</td>
                <td>
                    <a href="#" class="delete-item">
                        <i class="fas fa-times"></i>
                    </a>
                </td>
            </tr>
            `;
    tableBody.innerHTML += uiString;
  }
  //implement the clear function
  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }

  //implement the validate function
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  show(type, showmessage) {
    let message = document.getElementById("message");
    let boldtext;
    if (type == "success") {
      boldtext = "Success!";
    } else {
      boldtext = "Error :(";
    }
    message.innerHTML = `
                   <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                       <strong>${boldtext}</strong>${showmessage}
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                      </button>
                   </div>
        `;
    setTimeout(function () {
      message.innerHTML = " ";
    }, 3500);
  }

  deleteBook(target) {
    if (target.parentElement.classList.contains("delete-item")) {
      target.parentElement.parentElement.parentElement.remove();
    }
  }
}
//Local storage Class
class Storage {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Storage.getBooks();
    books.forEach(function (book) {
      let displays = new Display();
      displays.add(book);
    });
  }
  static addBooks(book) {
    const books = Storage.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBooks(bookname) {
    console.log(bookname);
    const books = Storage.getBooks();
    books.forEach(function (book, index) {
      if (book.name === bookname) {
        books.splice(index,1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
//DOM load event

document.addEventListener("DOMContentLoaded", Storage.displayBooks);

//Add submit event listener

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);
function libraryFormSubmit(e) {
  console.log("YOu have submitted library form");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let fiction = document.getElementById("fiction");
  let literature = document.getElementById("literature");
  let pyscology = document.getElementById("pyscology");

  if (fiction.checked) {
    type = fiction.value;
  } else if (literature.checked) {
    type = literature.value;
  } else if (pyscology.checked) {
    type = pyscology.value;
  }
  let book = new Book(name, author, type);
  console.log(book);

  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    Storage.addBooks(book); //storing to local storage
    display.clear();
    display.show("success", " Your book has been successfully added.");
  } else {
    display.show("danger", " Sorry you cannot add this book");
  }

  console.log(book);
  e.preventDefault();
}

document.body.addEventListener("click", function (e) {
  const display = new Display();
  display.deleteBook(e.target);
  Storage.removeBooks(
    e.target.parentElement.parentElement.parentElement.firstElementChild
      .textContent
  );
});
