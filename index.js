const { query, json } = require("express")
const express = require("express")
const path = require("path")

const{open} = require("sqlite")
const sqlite3 = require("sqlite3")
const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, "goodreads.db")
console.log(dbPath)

let db = null

const initializeDBAndServer = async () => {
    try {
      db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
      });
      app.listen(3000, () => {
        console.log("Server Running at http://localhost:3000/");
      });
    } catch (e) {
      console.log(`DB Error: ${e.message}`);
      process.exit(1);
    }
  };
  
  initializeDBAndServer();

app.get('/', welcome)
app.get('/books/', getAllBooks)
app.get('/books/:id', getBook)
app.post('/books', addBook)
app.put('/books/:id', updateBook)

function welcome(req, res){
    //console.log(req)
    res.send("Welcome to my app Aniket ")
}

async function getAllBooks(req, res){
    const query = `select * from book 
    order by book_id;`;

    const books_array = await db.all(query)
    //console.log(books_array)
    res.send(books_array)
}

//Get All Books : Done
//Get Book : Done
// Add Book : 
// Update Book : 
// Delete Book : 
// Get Author Books : 

async function getBook(req, res){
    const id = req.params['id']
    
    const query = `select * from book where book_id = ${id} `

    const book = await db.get(query)
    res.send(book)
}

async function addBook(req, res){
    
    const{name} = req.body
    const query = `insert into book (name) values('${name}');`

    const dbResponse = await db.run(query);
    const bookId = await dbResponse.lastID;
    res.send({ "bookId": bookId});

}

async function updateBook(req, res){
  const {id} = req.params
  const book = req.body
  const{name} = book

  query = `update book
  set name= '${name}'
  where book_id = '${id}'
`
  await db.run(query)
  res.send("Book updated successfully")
}