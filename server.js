const express = require('express');
const app = express();
const PORT = 3000;

const bookRoutes = require('./routes/booksRouter');

// Middleware to parse JSON
app.use(express.json());
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});