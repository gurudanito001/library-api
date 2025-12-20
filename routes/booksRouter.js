const express = require('express');
const {auth} = require('../middleware/auth');
const router = express.Router();

const { getAllBooks, getBookById, addBook, updateBook, deleteBook} = require('../controllers/booksController');



// Define routes
router.get('/', auth, getAllBooks); // Read all
router.get('/:bookId', auth, getBookById); // Read one
router.post('/', auth, addBook); // Create 
router.put('/:bookId', auth, updateBook); // Update
router.delete('/:bookId', auth, deleteBook); // Delete a book


module.exports = router;