const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();


// GET ALL USERS

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
}


// GET USER BY ID
const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.user.userId);
    const user = await prisma.user.findUnique({
      where: { id }
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// REGISTER USER
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    res.status(201).json({ message: "User registered", user: { id: user.id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// LOGIN USER
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return res.status(400).json({ message: "Either email or password is incorrect" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Either email or password is incorrect" });

    // create token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




module.exports = {
  register,
  login,
  getAllUsers,
  getUserById
};