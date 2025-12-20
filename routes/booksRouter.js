const express = require('express');
const router = express.Router();

const { getAllBooks, getBookById, addBook, updateBook, deleteBook} = require('../controllers/booksController');



// Define routes
router.get('/', getAllBooks); // Read all
router.get('/:bookId', getBookById); // Read one
router.post('/', addBook); // Create 
router.put('/:bookId', updateBook); // Update
router.delete('/:bookId', deleteBook); // Delete a book


module.exports = router;