const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const bookRoutes = require('./routes/booksRouter');
const authRoutes = require('./routes/authRouter');


// Middleware to parse JSON
app.use(cors());
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});