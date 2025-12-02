const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();


// CRUD Operations [Create, Read, Update, Delete]

// Get all books
const getAllBooks = async(req, res) => {
  const books = await prisma.book.findMany();
  res.status(200).json(books);
};

// Get one book
const getBookById = async (req, res) => {
  const id = parseInt(req.params.bookId);
  const book = await prisma.book.findUnique({
    where: {
      id: id
    }
  });
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(book);
};

const addBook = async (req, res) => {
  const { title, author, category } = req.body;

  const newBook = {
    title, 
    author, 
    category
  };
  const createdBook = await prisma.book.create({
    data: newBook
  });
  res.status(201).json(createdBook);
}

const updateBook = async (req, res) => {
  const id = parseInt(req.params.bookId);

  const { title, author, category } = req.body;
  const updatedBook = await prisma.book.update({
    where: { id: id },
    data: { title, author, category }
  });
  if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json(updatedBook);
}

const deleteBook = async (req, res) => {
  const id = parseInt(req.params.bookId);
  const deletedBook = await prisma.book.delete({
    where: { id: id }
  });
  if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
  res.status(200).json({ message: 'Book deleted' });
}

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};