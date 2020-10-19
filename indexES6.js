class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
class Display {
    add(book) {
        console.log("ading to ui");
        let tableBody = document.getElementById("tableBody");
        let uiString = `
                 <tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                  </tr>
    
                     `;
        tableBody.innerHTML += uiString;
    }
    clear() {
        let libraryForm = document.getElementById("libraryForm")
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }
    show(type, showmessage) {
        let message = document.getElementById("message");
        let boldtext;
        if (type == "success") {
            boldtext = "Success!";
        }
        else {
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
        // to remove the header popup after two seconds
        setTimeout(function () {
            message.innerHTML = "";
        }, 2000);

    }
}
//Add submit event listener

let libraryForm = document.getElementById("libraryForm")
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {


    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let literature = document.getElementById('literature');
    let pyscology = document.getElementById('pyscology');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (literature.checked) {
        type = literature.value;
    }
    else if (pyscology.checked) {
        type = pyscology.value;
    }
    //objects of Book class
    let book = new Book(name, author, type);
    //objects of Display class
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", " Your book has been successfully added.");
    }
    else {
        display.show("danger", " Sorry you cannot add this book");
    }
    e.preventDefault();


}
