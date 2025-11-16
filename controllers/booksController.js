

let books = [
  { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe' },
  { id: 2, title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie' },
  { id: 3, title: 'Wetin man go do', author: 'Armour' }
];


// CRUD Operations [Create, Read, Update, Delete]

// Get all books
const getAllBooks = (req, res) => {
  res.json(books);
};

// Get one book
const getBookById = (req, res) => {
  const id = parseInt(req.params.bookId);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
};

const addBook = (req, res) => {
  const { title, author } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
}

const updateBook = (req, res) => {
  const id = parseInt(req.params.bookId);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  res.status(200).json(book);
}

const deleteBook = (req, res) => {
  const id = parseInt(req.params.bookId);
  books = books.filter(b => b.id !== id);
  res.status(200).json({ message: 'Book deleted' });
}


module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};